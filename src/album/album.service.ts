import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
	constructor(
		@InjectRepository(AlbumEntity)
		private albumRepository: Repository<AlbumEntity>,
		@InjectRepository(ArtistEntity)
		private artistRepository: Repository<ArtistEntity>,
	) {}

	async findAll(): Promise<AlbumEntity[]> {
		return await this.albumRepository.find();
	}

	async findOne(id: string): Promise<AlbumEntity> {
		const album = await this.albumRepository.findOne({ where: { id: id } });
		if (album) {
			return album;
		}

		throw new NotFoundException(`Album with ${id} not found`);
	}

	async create(dto: AddAlbumDto) {
		const album = this.albumRepository.create(dto);
		if (dto.artistId) {
			const checkArtist = await this.artistRepository.findOne({
				where: { id: dto.artistId },
			});
			if (checkArtist === null) {
				album.artistId = null;
			}
		}
		return await this.albumRepository.save(album);
	}

	async update(id: string, dto: UpdateAlbumDto) {
		const albumToUpdate = await this.findOne(id);

		if (albumToUpdate) {
			if (dto.artistId) {
				const checkArtist = await this.artistRepository.findOne({
					where: { id: dto.artistId },
				});
				if (checkArtist === null) {
					throw new NotFoundException(`Can't find artist ${dto.artistId}`);
				}
			}
			Object.assign(albumToUpdate, dto);
			return await this.albumRepository.save(albumToUpdate);
		}
	}

	async delete(id: string) {
		const albumDelete = await this.albumRepository.delete(id);
		if (albumDelete.affected === 0) {
			throw new NotFoundException(`Album with ${id} not found`);
		}
	}
}
