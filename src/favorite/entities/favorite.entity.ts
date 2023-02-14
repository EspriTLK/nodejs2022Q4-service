import { AlbumEntity } from 'src/album/entities/album.entity';
// import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class FavoriteEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	// @PrimaryColumn()
	// type: string;

	@ManyToMany(() => AlbumEntity, {
		eager: true,
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinTable()
	albums: AlbumEntity[];
	@ManyToMany(() => TrackEntity, {
		eager: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinTable()
	tracks: TrackEntity[];
	// @OneToMany(() => ArtistEntity, (artist) => artist.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	// @JoinColumn()
	// artists: ArtistEntity[]
}
