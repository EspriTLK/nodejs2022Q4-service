import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { AddTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track-dto'
import { Track } from './interfaces/track.interface';

@Controller('track')
export class TrackController {
	constructor(private readonly trackService: TrackService) { }

	@Get()
	async getTracks(): Promise<Track[]> {
		return await this.trackService.findAll()
	}

	@Get(':id')
	async getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
		return await this.trackService.findOne(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async addTrack(@Body() dto: AddTrackDto): Promise<Track> {
		try {
			return await this.trackService.create(dto)
		} catch (error) {
			return error.message
		}
	}

	@HttpCode(200)
	@Put(':id')
	async updateTrack(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTrackDto): Promise<Track> {
		return await this.trackService.update(id, dto)
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		await this.trackService.delete(id)
	}
}
