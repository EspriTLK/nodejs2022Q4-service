import { forwardRef, HttpException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { db } from 'src/DB/DB'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { AlbumService } from 'src/album/album.service';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class FavoriteService {
	constructor(
		@InjectRepository(FavoriteEntity)
		private favRepository: Repository<FavoriteEntity>,
		// @Inject(forwardRef(() => AlbumService))
		@InjectRepository(AlbumEntity)
		private readonly albumRepository: Repository<AlbumEntity>
		// private readonly albumService: AlbumService
	) { }
	private db = db

	async findAll() {
		const albums = await this.favRepository.find()
		// albums.map(album => album.)
		return albums
	}

	async getAll() {
		return await this.db.getAllFavs()
	}

	async addAlbumToFavorite(id: string) {
		const album = await this.albumRepository.findOne({ where: { id: id } })
		if (!album) {
			throw new UnprocessableEntityException(`Album with id ${id} not found`)
		}
		this.favRepository.save(album)
		return album
	}

	async addFavorite(path, id) {
		const service = path[0].toUpperCase() + path.slice(1)

		if (await this.db[`get${service}ById`](id)) {
			return await this.db.addToFav(path, id)
		} else {
			throw new Error(`id: ${id} not found in DB ${service}`)
		}
	}

	async removeFavorite(path, id) {
		const service = path[0].toUpperCase() + path.slice(1)
		const findInFav = await this.db.DB.favorites[`${path}s`].find(obj => obj.id === id)
		if (await this.db.DB.favorites[`${path}s`].find(obj => obj.id === id)) {
			return await this.db.removeFromFav(path, id)
		} else {
			throw new Error(`id: ${id} not found in DB ${service}`)
		}
	}
}
