import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer";

@Entity('user')
export class UserEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	login: string

	@Exclude({ toPlainOnly: true })
	@Column()
	password: string

	@Column({ default: 1 })
	version: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	constructor(partials: Partial<UserEntity>) {
		Object.assign(this, partials);
	}
}