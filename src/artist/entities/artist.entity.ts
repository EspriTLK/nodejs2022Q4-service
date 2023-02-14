import { Exclude } from "class-transformer";
import { AlbumEntity } from "src/album/entities/album.entity";
import { TrackEntity } from "src/track/entities/track.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('artist')
export class ArtistEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string; // uuid v4
	@Column()
	name: string;
	@Column({ default: false })
	grammy: boolean;
	@Exclude()
	@Column({ default: false })
	isFavorite: boolean;

	// @OneToMany(() => AlbumEntity, (album) => album.artist)
	// album: AlbumEntity[];
	// // onDelete: "SET NULL"
	// @OneToMany(() => TrackEntity, (track) => track.artists)
	// track: TrackEntity[];
}