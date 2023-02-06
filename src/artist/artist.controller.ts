import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { validate } from 'uuid';
import { ArtistService } from './artist.service';
import { Artist } from './interfaces/artist.interface';
import { artistsErrors } from './artist.constants';
import { AddArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
	constructor(private readonly artistService: ArtistService) { }

	@Get()
	async getArtists(): Promise<Artist[]> {
		return await this.artistService.getAll()
	}

	@Get(':id')
	async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
		// if (!validate(id)) {
		// 	throw new HttpException(artistsErrors.TRACK_ID_IS_NOT_VALID, HttpStatus.BAD_REQUEST)
		// }
		try {
			return await this.artistService.getById(id)
		} catch (err) {
			throw new HttpException(artistsErrors.TRACK_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@Post()
	async createArtist(@Body() dto: AddArtistDto): Promise<Artist | HttpException> {
		// if(dto typeof )
		try {
			return await this.artistService.create(dto)
		} catch (error) {
			return error.message
		}
	}

	@HttpCode(200)
	@Put(':id')
	async updateTrack(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateArtistDto) {
		try {
			return await this.artistService.update(id, dto)
		} catch {
			throw new HttpException(artistsErrors.TRACK_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		try {
			await this.getArtist(id)
			await this.artistService.delete(id)
		} catch {
			throw new HttpException(artistsErrors.TRACK_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}
}
