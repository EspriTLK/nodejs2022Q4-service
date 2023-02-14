import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './interfaces/artist.interface';
import { AddArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@Get()
	async getArtists(): Promise<Artist[]> {
		return await this.artistService.findAll();
	}

	@Get(':id')
	async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
		return await this.artistService.findOne(id);
	}

	@Post()
	async createArtist(
		@Body() dto: AddArtistDto,
	): Promise<Artist | HttpException> {
		try {
			return await this.artistService.create(dto);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@HttpCode(200)
	@Put(':id')
	async updateTrack(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateArtistDto,
	): Promise<Artist> {
		return await this.artistService.update(id, dto);
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		return await this.artistService.delete(id);
	}
}
