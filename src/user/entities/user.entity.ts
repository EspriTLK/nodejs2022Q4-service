import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	login: string;

	@Exclude({ toPlainOnly: true })
	@Column()
	password: string;

	@Column({ default: 1 })
	version: number;

	@CreateDateColumn()
	@Transform(({ value }) => new Date(value).getTime())
	createdAt: Date;

	@UpdateDateColumn()
	@Transform(({ value }) => new Date(value).getTime())
	updatedAt: Date;

	constructor(partials: Partial<UserEntity>) {
		Object.assign(this, partials);
	}
}
