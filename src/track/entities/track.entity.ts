import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('track')
export class TrackEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string; // uuid v4
	@Column()
	name: string;
	@Column({ default: null, type: "uuid", nullable: true })
	artistId: string | null; // refers to Artist
	@Column({ default: null, type: "uuid", nullable: true })
	albumId: string | null; // refers to Album
	@Column({ default: 0 })
	duration: number; // integer number

}