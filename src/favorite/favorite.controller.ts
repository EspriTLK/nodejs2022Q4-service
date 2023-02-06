import { Controller, Delete, Get, HostParam, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { FavoriteService } from './favorite.service';
import { FavoritesRepsonse } from './interfaces/fav.interface';

@Controller('favs')
export class FavoriteController {
	constructor(private readonly favService: FavoriteService) { }

	@Get()
	async getAlbums(): Promise<FavoritesRepsonse[]> {
		return await this.favService.getAll()
	}

	@Post(':path/:id')
	async addToFav(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string): Promise<any> {
		if (path === 'track' || path === 'album' || path === 'artist') {
			// console.log(path, id);
			try {
				return await this.favService.addFavorite(path, id)
			} catch (err) {
				throw new HttpErrorByCode[422]
			}
		} else {
			throw new HttpErrorByCode[404]
		}
	}

	@HttpCode(204)
	@Delete(':path/:id')
	async remFromFav(@Param('path') path: string, @Param('id', ParseUUIDPipe) id: string): Promise<any> {
		// await this.favService.removeFavorite(path, id)
		if (path === 'track' || path === 'album' || path === 'artist') {
			// console.log(path, id);
			try {
				console.log('ololo')
				return await this.favService.removeFavorite(path, id)
			} catch (err) {
				throw new HttpException('not in favorite', HttpStatus.NOT_FOUND)
			}
		} else {
			throw new HttpErrorByCode[404]
		}
	}
}
