import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('artist')
export class ArtistEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string; // uuid v4
	@Column()
	name: string;
	@Column({ default: null, nullable: true })
	grammy: boolean | null;
}