import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { validate } from 'uuid';
import { trackErrors } from './track.constants';
import { TrackModel } from './track.model';
import { AddTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track-dto'
import { Track } from './interfaces/track.interface';

@Controller('track')
export class TrackController {
	constructor(private readonly trackService: TrackService) { }

	@Get()
	async getTracks(): Promise<Track[]> {
		return await this.trackService.getAll()
	}

	@Get(':id')
	async getTrack(@Param('id') id: string): Promise<Track> {
		if (!validate(id)) {
			throw new HttpException(trackErrors.TRACK_ID_IS_NOT_VALID, HttpStatus.BAD_REQUEST)
		}
		try {
			return await this.trackService.getById(id)
		} catch (err) {
			throw new HttpException(trackErrors.TRACK_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async addTrack(@Body() dto: AddTrackDto) {

		if (!dto.name || !dto.duration) {
			throw new HttpException(trackErrors.REQIRE_FIELDS_NO_EXISTS, HttpStatus.BAD_REQUEST)
		}

		try {
			return await this.trackService.create(dto)
		} catch (error) {
			return error.message
		}

	}

	@HttpCode(200)
	@Put(':id')
	async updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
		await this.getTrack(id).then(async (track) => {
			await this.trackService.update(track.id, dto)
		})
		return this.trackService.getById(id)
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.getTrack(id).then(async (track) => {
			await this.trackService.delete(track.id)
		})
		return 'track deleted'
	}
}
