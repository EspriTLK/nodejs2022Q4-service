import { AlbumEntity } from "src/album/entities/album.entity";
import { ArtistEntity } from "src/artist/entities/artist.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('track')
export class TrackEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string; // uuid v4
	@Column()
	name: string;
	@Column({ default: null, nullable: true })
	artistId: string | null; // refers to Artist
	@Column({ default: null, nullable: true })
	albumId: string | null; // refers to Album
	@Column({ default: 0 })
	duration: number; // integer number

	@ManyToOne(() => ArtistEntity, (artist) => artist.id, { onDelete: "SET NULL" })
	artist: ArtistEntity;

	@ManyToOne(() => AlbumEntity, (album) => album.id, { onDelete: 'SET NULL' })
	album: AlbumEntity;

}