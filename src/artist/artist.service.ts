import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
	constructor(
		@InjectRepository(ArtistEntity)
		private artistRepository: Repository<ArtistEntity>
	) { }

	async findAll() {
		return await this.artistRepository.find()
	}

	async findOne(id: string) {
		const artist = await this.artistRepository.findOne({ where: { id: id } })

		if (artist) {
			return artist
		}

		throw new NotFoundException(`Artist with id ${id} not found`)
	}

	async create(dto: AddArtistDto) {
		const artist = await this.artistRepository.create(dto)
		return await this.artistRepository.save(artist)
	}

	async update(id: string, dto: UpdateArtistDto) {
		const artistToUpdate = await this.findOne(id)

		if (artistToUpdate) {
			Object.assign(artistToUpdate, dto)
			return await this.artistRepository.save(artistToUpdate)
		}
	}

	async delete(id: string) {
		const artistDelete = await this.artistRepository.delete(id)
		if (artistDelete.affected === 0) {
			throw new NotFoundException(`Artist with id ${id} not found`)
		}
	}
}
