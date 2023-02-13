import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    ArtistModule],
  exports: [AlbumService, TypeOrmModule],
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule { }
