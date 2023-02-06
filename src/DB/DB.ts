import { Injectable } from "@nestjs/common";
import { findIndex } from "rxjs";
import DBUsers from "./entities/DBUsers";
import DBTracks from './entities/DBTracks'
import DBArtists from "./entities/DBArtists";
import DBAlbums from "./entities/DBAlbums";

@Injectable()
export default class DB {
	DB = { users: [], albums: [], artists: [], tracks: [], favorites: { artists: [], albums: [], tracks: [] } }
	users = new DBUsers()
	tracks = new DBTracks()
	artists = new DBArtists()
	albums = new DBAlbums()
	// favorites = [{ artists: [], albums: [], tracks: [] }]

	constructor() {
	}

	async createUser(data) {
		const user = await this.users.create(data)
		if (user) {
			this.DB.users.push(user)
			return user
		}
	}

	async getAllUsers() {
		return await this.DB.users
	}

	async getUserById(id) {
		return await this.DB.users.find(u => u.id === id)
	}

	async updateUserPassword(id, data) {
		const changedUser = await this.getUserById(id)
		if (changedUser && changedUser.password === data.oldPassword) {
			const newUser = await this.users.update(data, changedUser)
			changedUser.password = data.newPassword
			changedUser.version = newUser.version
			changedUser.updatedAt = newUser.updatedAt
			return 'update succesfully'
		}
	}

	async removeUser(id) {
		await this.getUserById(id)
		this.DB.users.splice(await this.DB.users.findIndex(user => user.id === id), 1)
	}

	async getAllTracks() {
		return await this.DB.tracks
	}

	async getTrackById(id) {
		return await this.DB.tracks.find(t => t.id === id)
	}

	async createTrack(data) {
		const track = await this.tracks.create(data)
		if (track) {
			this.DB.tracks.push(track)
			return track
		}
	}

	async updateTrack(id, data) {
		const changedTrack = await this.getTrackById(id)
		if (changedTrack) {
			const updatedTrack = await this.tracks.update(data, changedTrack)
			changedTrack.name = updatedTrack.name
			changedTrack.artistId = updatedTrack.artistId
			changedTrack.albumId = updatedTrack.albumId
			changedTrack.duration = updatedTrack.duration

			return updatedTrack
		}
	}

	async removeTrack(id) {
		await this.getTrackById(id)
		this.DB.tracks.splice(await this.DB.tracks.findIndex(track => track.id === id), 1)
		if (this.DB.favorites.tracks.find(track => track.id === id)) {
			this.DB.favorites.tracks.splice(this.DB.favorites.tracks.findIndex(track => track.id === id), 1)
		}

	}

	async getAllArtists() {
		return await this.DB.artists
	}

	async getArtistById(id) {
		return await this.DB.artists.find(artist => artist.id === id)
	}

	async createArtist(data) {
		const artist = await this.artists.create(data)
		if (artist) {
			this.DB.artists.push(artist)
			return artist
		}
	}

	async updateArtist(id, data) {
		const changedArtist = await this.getArtistById(id)
		if (changedArtist) {
			const updatedArtist = await this.artists.update(data, changedArtist)
			changedArtist.name = updatedArtist.name
			changedArtist.grammy = updatedArtist.grammy
			// changedTrack.albumId = updatedTrack.albumId
			// changedTrack.duration = updatedTrack.duration

		}
		return changedArtist
	}

	async removeArtist(id) {
		await this.getArtistById(id)
		this.DB.artists.splice(await this.DB.artists.findIndex(artist => artist.id === id), 1)

		if (this.DB.tracks.find(track => track.artistId === id)) {
			this.DB.tracks.find(track => track.artistId = null)
		}
		if (this.DB.albums.find(album => album.artistId === id)) {
			this.DB.albums.find(album => album.artistId = null)
		}
		if (this.DB.favorites.artists.find(artist => artist.id === id)) {
			this.DB.favorites.artists.splice(this.DB.favorites.artists.findIndex(artist => artist.id === id), 1)
		}

	}

	async getAllAlbums() {
		return await this.DB.albums
	}

	async getAlbumById(id) {
		return await this.DB.albums.find(album => album.id === id)
	}

	async createAlbum(data) {
		const album = await this.albums.create(data)
		if (this.albums) {
			this.DB.albums.push(album)
			return album
		}
	}

	async updateAlbum(id, data) {
		const changedAlbum = await this.getAlbumById(id)
		if (changedAlbum) {
			const updatedAlbum = await this.albums.update(data, changedAlbum)
			changedAlbum.name = updatedAlbum.name
			changedAlbum.year = updatedAlbum.year
			changedAlbum.artistId = updatedAlbum.artistId
			// changedTrack.albumId = updatedTrack.albumId
			// changedTrack.duration = updatedTrack.duration

		}
		return changedAlbum
	}

	async removeAlbum(id) {
		await this.getAlbumById(id)
		this.DB.albums.splice(await this.DB.albums.findIndex(album => album.id === id), 1)
		if (this.DB.tracks.find(track => track.albumId === id)) {
			this.DB.tracks.find(track => track.albumId = null)
		}

		if (this.DB.favorites.albums.find(album => album.id === id)) {
			this.DB.favorites.albums.splice(this.DB.favorites.albums.findIndex(album => album.id === id), 1)
		}
	}

	async getAllFavs() {
		return await this.DB.favorites
	}

	async addToFav(path: string, id) {
		const service = path[0].toUpperCase() + path.slice(1)
		await this.DB.favorites[path + 's'].push(await this[`get${service}ById`](id))
		return await this[`get${service}ById`](id)
	}

	async removeFromFav(path: string, id) {

		const dbKey = path + 's'

		await this.DB.favorites[dbKey].splice(await this.DB.favorites[dbKey].findIndex(fav => fav.id === id), 1)
	}
}

export const db = new DB()