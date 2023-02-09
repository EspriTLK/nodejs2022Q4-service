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

	@Column()
	version: number

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	// toResponse() {
	// 	const { id, login } = this
	// 	return { id, login }
	// }

	constructor(partials: Partial<UserEntity>) {
		Object.assign(this, partials);
	}
}