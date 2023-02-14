import { AlbumEntity } from "src/album/entities/album.entity";
import { ArtistEntity } from "src/artist/entities/artist.entity";
import { TrackEntity } from "src/track/entities/track.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorite')
export class FavoriteEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	// @PrimaryColumn()
	// type: string;

	@ManyToMany((type) => AlbumEntity, { eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinTable()
	albums: AlbumEntity[]
	@ManyToMany(() => TrackEntity, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinTable()
	tracks: TrackEntity[]
	// @OneToMany(() => ArtistEntity, (artist) => artist.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	// @JoinColumn()
	// artists: ArtistEntity[]
}