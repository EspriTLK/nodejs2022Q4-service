import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    AlbumModule
  ],
  exports: [FavoriteService],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule { }
