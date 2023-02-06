import { Injectable } from '@nestjs/common';
import { db } from 'src/DB/DB'
import { AddArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
	private db = db

	async getAll() {
		return await this.db.getAllArtists()
	}

	async getById(id: string) {
		const currentArtist = await this.db.getArtistById(id)
		if (!currentArtist) {
			throw new Error('track not found')
		}
		return currentArtist
	}

	async create(dto: AddArtistDto) {
		const artist = await this.db.createArtist(dto)
		return artist
	}

	async update(id: string, dto: UpdateArtistDto) {
		const changedArtist = await this.db.updateArtist(id, dto)
		if (!changedArtist) {
			throw new Error('service')
		}

		return changedArtist
	}

	async delete(id: string) {
		const artistDelete = await this.db.removeArtist(id)
		return artistDelete
	}
}
