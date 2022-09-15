import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
