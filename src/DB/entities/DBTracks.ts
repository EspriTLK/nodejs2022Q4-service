import { v4 } from 'uuid'
import { TrackModel } from 'src/track/track.model'
import { UpdateTrackDto } from 'src/track/dto/update-track-dto'

type ITrack = TrackModel
export default class DBTracks extends TrackModel {
	async create(dto: TrackModel): Promise<ITrack> {
		const created: ITrack = {
			...dto,
			id: v4(),
			artistId: dto.artistId || null,
			albumId: dto.albumId || null
		};
		// console.log(created);
		return await created
	}

	async update(dto: UpdateTrackDto, track: ITrack): Promise<ITrack> {
		const updated: ITrack = {
			id: track.id,
			name: dto.name ? dto.name : track.name,
			artistId: dto.artistId ? dto.artistId : track.artistId,
			albumId: dto.albumId ? dto.albumId : track.albumId,
			duration: dto.duration ? dto.duration : track.duration
		}
		return await updated
	}
}
