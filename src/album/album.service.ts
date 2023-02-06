import { Injectable } from '@nestjs/common';
import { db } from 'src/DB/DB'
import { AddAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
	private db = db

	async getAll() {
		return await this.db.getAllAlbums()
	}

	async getById(id: string) {
		const currentAlbum = await this.db.getAlbumById(id)
		if (!currentAlbum) {
			throw new Error('track not found')
		}
		return currentAlbum
	}

	async create(dto: AddAlbumDto) {
		const album = await this.db.createAlbum(dto)
		return album
	}

	async update(id: string, dto: UpdateAlbumDto) {
		const changedAlbum = await this.db.updateAlbum(id, dto)
		if (!changedAlbum) {
			throw new Error('service')
		}

		return changedAlbum
	}

	async delete(id: string) {
		const albumDelete = await this.db.removeAlbum(id)
		return albumDelete
	}
}
