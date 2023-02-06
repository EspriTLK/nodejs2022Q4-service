import { v4 } from 'uuid'
import { Album } from 'src/album/interfaces/album.interface';
import { AlbumModel } from 'src/album/album.model';

export default class DBAlbums extends AlbumModel {
	async create(dto: AlbumModel): Promise<Album> {
		const created: Album = {
			...dto,
			id: v4(),
			artistId: dto.artistId ? dto.artistId : null
		};
		// console.log(created);
		return await created
	}

	async update(dto: AlbumModel, album: Album): Promise<Album> {
		const updated: Album = {
			id: album.id,
			name: dto.name ? dto.name : album.name,
			year: dto.year ? dto.year : album.year,
			artistId: dto.artistId ? dto.artistId : album.artistId
		}
		return await updated
	}
}
