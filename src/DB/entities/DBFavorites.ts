// import { v4 } from 'uuid'
// import { FavoritesRepsonse } from 'src/favorite/interfaces/fav.interface';
// import { AlbumModel } from 'src/album/album.model';
// import { TrackModel } from 'src/track/track.model';
// import { ArtistModel } from 'src/artist/artist.model';
// import { FavModel } from 'src/favorite/favorite.model';


// export default class DBFavorites extends FavModel {
// 	async add(dto: AlbumModel | TrackModel | ArtistModel): Promise<FavoritesRepsonse> {
// 		const addeded: AlbumModel | TrackModel | ArtistModel = {
// 			...dto
// 		};
// 		// console.log(created);
// 		return await addeded
// 	}

// 	async update(dto: AlbumModel, album: Album): Promise<Album> {
// 		const updated: Album = {
// 			id: album.id,
// 			name: dto.name ? dto.name : album.name,
// 			year: dto.year ? dto.year : album.year,
// 			artistId: dto.artistId ? dto.artistId : album.artistId
// 		}
// 		return await updated
// 	}
// }
