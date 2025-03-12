import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { multerConfig } from '../config/multer.config';

@Controller('images')
export class ImageController {

  private readonly logger = new Logger(ImageController.name);
  constructor(private readonly imageService: ImageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig)) 
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    this.logger.debug(`Received file: ${JSON.stringify(file)}`);
    const createImage = {
      name: file.originalname,
      filePath: file.path
    }
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.imageService.create(createImage);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }
}