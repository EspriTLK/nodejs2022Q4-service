import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('album')
export class AlbumEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string; // uuid v4
	@Column()
	name: string;
	@Column()
	year: number;
	@Column({ default: null, nullable: true })
	artistId: string | null; // refers to Artist
	@Exclude()
	@Column({ default: false })
	isFavorite: boolean;

	@ManyToOne(() => ArtistEntity, (artist) => artist.id, {
		onDelete: 'SET NULL',
	})
	artist: ArtistEntity;

	// @OneToMany(() => TrackEntity, (track) => track.artists)
	// track: TrackEntity[];

	// @ManyToMany((type) => FavoriteEntity, (fav) => fav.album)
	// albums: AlbumEntity;
}
