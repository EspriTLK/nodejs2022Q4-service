import { v4 } from 'uuid'
import { TrackModel } from 'src/track/track.model'

type ITrack = TrackModel
export default class DBTracks extends TrackModel {
	async create(dto: TrackModel): Promise<ITrack> {
		const created: ITrack = {
			...dto,
			id: v4(),
		};
		// console.log(created);
		return await created
	}

}
