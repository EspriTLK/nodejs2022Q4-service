import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTrackDto } from './dto/update-track-dto';
import { AddTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
	constructor(
		@InjectRepository(TrackEntity)
		private trackRepository: Repository<TrackEntity>) { }

	async findAll(): Promise<TrackEntity[]> {
		return await this.trackRepository.find()
	}

	async findOne(id: string): Promise<TrackEntity> {
		const track = await this.trackRepository.findOne({ where: { id: id } })
		if (track) {
			return track
		}
		throw new NotFoundException(`Track with id ${id} is not found`)
	}

	async create(dto: AddTrackDto): Promise<TrackEntity> {
		const newTrack = await this.trackRepository.create(dto)
		return await this.trackRepository.save(newTrack)
	}

	async update(id: string, dto: UpdateTrackDto): Promise<TrackEntity> {
		const trackToUpdate = await this.findOne(id)

		if (trackToUpdate) {
			Object.assign(trackToUpdate, dto)
			return await this.trackRepository.save(trackToUpdate)
		}
	}

	async delete(id: string) {
		const trackDelete = await this.trackRepository.delete(id)

		if (trackDelete.affected === 0) {
			throw new NotFoundException(`Track with id ${id} is not found`)
		}
	}

}
