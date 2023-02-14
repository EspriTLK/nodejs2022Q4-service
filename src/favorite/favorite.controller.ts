import { ClassSerializerInterceptor, Controller, Delete, Get, HostParam, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { FavoriteService } from './favorite.service';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoriteController {
	constructor(private readonly favService: FavoriteService) { }

	@Get()
	async getAlbums(): Promise<object> {
		const favorites = await this.favService.findAll()

		return favorites
	}

	@Post(':path/:id')
	async addToFav(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string): Promise<any> {
		if (path === 'track' || path === 'album' || path === 'artist') {
			return await this.favService.addFavorite(path, id)
		} else {
			throw new HttpErrorByCode[404]
		}
	}

	@HttpCode(204)
	@Delete(':path/:id')
	async remFromFav(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string): Promise<any> {

		if (path === 'track' || path === 'album' || path === 'artist') {
			return await this.favService.removeFavorite(path, id)
		} else {
			throw new HttpErrorByCode[404]
		}
	}
}
