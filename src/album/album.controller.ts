import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { albumsErrors } from './album.constants';
import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
	constructor(private readonly albumService: AlbumService) { }

	@Get()
	async getAlbums(): Promise<Album[]> {
		return await this.albumService.getAll()
	}

	@Get(':id')
	async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
		// if (!validate(id)) {
		// 	throw new HttpException(artistsErrors.TRACK_ID_IS_NOT_VALID, HttpStatus.BAD_REQUEST)
		// }
		try {
			return await this.albumService.getById(id)
		} catch (err) {
			throw new HttpException(albumsErrors.ALBUM_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@Post()
	async createArtist(@Body() dto: AddAlbumDto): Promise<Album | HttpException> {
		// if(dto typeof )
		try {
			return await this.albumService.create(dto)
		} catch (error) {
			return error.message
		}
	}

	@HttpCode(200)
	@Put(':id')
	async updateAlbum(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlbumDto) {
		try {
			return await this.albumService.update(id, dto)
		} catch {
			throw new HttpException(albumsErrors.ALBUM_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		try {
			await this.getAlbum(id)
			await this.albumService.delete(id)
		} catch {
			throw new HttpException(albumsErrors.ALBUM_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}
}
