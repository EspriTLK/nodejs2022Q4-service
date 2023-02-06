import { v4 } from 'uuid'
import { Artist } from 'src/artist/interfaces/artist.interface';
import { ArtistModel } from 'src/artist/artist.model';

export default class DBArtists extends ArtistModel {
	async create(dto: ArtistModel): Promise<Artist> {
		const created: Artist = {
			...dto,
			id: v4(),
			grammy: dto.grammy ? dto.grammy : false
		};
		// console.log(created);
		return await created
	}

	async update(dto: ArtistModel, artist: Artist): Promise<Artist> {
		const updated: Artist = {
			id: artist.id,
			name: dto.name ? dto.name : artist.name,
			grammy: dto.grammy ? dto.grammy : false
		}
		return await updated
	}
}
