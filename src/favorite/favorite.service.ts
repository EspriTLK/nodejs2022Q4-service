import {
	HttpCode,
	Injectable,
	UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavoriteService {
	constructor(
		@InjectRepository(FavoriteEntity)
		private favRepository: Repository<FavoriteEntity>,
		@InjectRepository(AlbumEntity)
		private readonly albumRepository: Repository<AlbumEntity>,
		@InjectRepository(TrackEntity)
		private readonly trackRepository: Repository<TrackEntity>,
		@InjectRepository(ArtistEntity)
		private readonly artistRepository: Repository<ArtistEntity>,
	) {}

	async findAll() {
		// const albums = await this.favRepository.find({ select: ['albums'] })
		const albumIsFavorite = await this.albumRepository.find({
			where: { isFavorite: true },
		});
		const trackIsFavorite = await this.trackRepository.find({
			where: { isFavorite: true },
		});
		const artistIsFavorite = await this.artistRepository.find({
			where: { isFavorite: true },
		});

		return {
			albums: albumIsFavorite,
			tracks: trackIsFavorite,
			artists: artistIsFavorite,
		};
	}

	// async addAlbumToFavorite(id: string) {
	// 	const album = await this.albumRepository.findOne({ where: { id: id } })
	// 	if (!album) {
	// 		throw new UnprocessableEntityException(`Album with id ${id} not found`)
	// 	}
	// 	album.isFavorite = true
	// 	const albumToFav = this.favRepository.create({ albums: [album] })
	// 	await this.favRepository.save(albumToFav)
	// 	// await albumToFav.albums.push(album)
	// 	return album
	// }

	async addFavorite(path, id) {
		const fav = await this[`${path}Repository`].findOne({ where: { id: id } });
		if (!fav) {
			throw new UnprocessableEntityException(`${path} with id ${id} not found`);
		}
		fav.isFavorite = true;
		await this[`${path}Repository`].save(fav);
		return fav;
	}

	async removeFavorite(path, id) {
		const favToDelete = await this[`${path}Repository`].findOne({
			where: { id: id },
		});
		if (!favToDelete) {
			throw new UnprocessableEntityException(`${path} with id ${id} not found`);
		}
		favToDelete.isFavorite = false;
		await this[`${path}Repository`].save(favToDelete);
		return HttpCode[204];
	}
}
