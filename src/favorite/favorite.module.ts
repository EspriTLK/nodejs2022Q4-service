import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([FavoriteEntity]),
		AlbumModule,
		TrackModule,
		ArtistModule,
	],
	exports: [FavoriteService],
	controllers: [FavoriteController],
	providers: [FavoriteService],
})
export class FavoriteModule {}
