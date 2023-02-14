import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	@Get()
	async getAlbums(): Promise<Album[]> {
		return await this.albumService.findAll();
	}

	@Get(':id')
	async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
		return await this.albumService.findOne(id);
	}

	@Post()
	async createArtist(@Body() dto: AddAlbumDto): Promise<Album | HttpException> {
		try {
			return await this.albumService.create(dto);
		} catch (error) {
			return error.message;
		}
	}

	@HttpCode(200)
	@Put(':id')
	async updateAlbum(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateAlbumDto,
	) {
		return await this.albumService.update(id, dto);
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		await this.albumService.delete(id);
	}
}
