import { Injectable } from '@nestjs/common';
import { db } from 'src/DB/DB'

@Injectable()
export class FavoriteService {
	private db = db

	async getAll() {
		return await this.db.getAllFavs()
	}

	async addFavorite(path, id) {
		const service = path[0].toUpperCase() + path.slice(1)

		if (await this.db[`get${service}ById`](id)) {
			return await this.db.addToFav(path, id)
		} else {
			throw new Error(`id: ${id} not found in DB ${service}`)
		}
	}

	async removeFavorite(path, id) {
		const service = path[0].toUpperCase() + path.slice(1)
		const findInFav = await this.db.DB.favorites[0][`${path}s`].find(obj => obj.id === id)
		console.log(`try to ${await findInFav}`)
		if (await this.db.DB.favorites[0][`${path}s`].find(obj => obj.id === id)) {
			return await this.db.removeFromFav(path, id)
		} else {
			throw new Error(`id: ${id} not found in DB ${service}`)
		}
	}
}
