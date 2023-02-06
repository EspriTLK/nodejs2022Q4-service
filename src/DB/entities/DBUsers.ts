import { v4 } from 'uuid'
import { UserModel } from 'src/user/user.model'
import { CreateUserDto, UpdatePasswordDto } from 'src/user/dto/user.dto'
import { ConsoleLogger, Logger } from '@nestjs/common';

type IUser = UserModel

export default class DBUsers extends UserModel {
	async create(dto: CreateUserDto): Promise<IUser> {
		const created: IUser = {
			...dto,
			id: v4(),
			version: 1,
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		// console.log(created);
		return await created
	}

	async update(dto: UpdatePasswordDto, user: IUser): Promise<IUser> {
		const updated: IUser = {
			id: user.id,
			version: user.version + 1,
			createdAt: user.createdAt,
			updatedAt: Date.now(),
			login: user.login,
			password: dto.newPassword
		}

		return updated
	}
}
