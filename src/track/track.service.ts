import { Injectable } from '@nestjs/common';
import { db } from '../DB/DB'
import { TrackModel } from './track.model';

@Injectable()
export class TrackService {
	private db = db

	async getAll() {
		return await this.db.getAllTracks()
	}

	async getById(id: string) {
		const currentTrack = await this.db.getTrackById(id)
		if (!currentTrack) {
			throw new Error('track not found')
		}
		return currentTrack
	}

	async create(dto: TrackModel) {
		const track = await this.db.createTrack(dto)
		return track
	}

	// async update(id: string, dto: UpdatePasswordDto) {
	// 	const changedUser = await this.db.updateUserPassword(id, dto)
	// 	if (!changedUser) {
	// 		console.log('[from service]')
	// 		throw new Error('service')
	// 	}
	// 	return changedUser
	// }

	async delete(id: string) {
		const trackDelete = await this.db.removeTrack(id)
		return trackDelete
	}

}
