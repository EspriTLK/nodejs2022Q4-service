import { v4 } from 'uuid'
import { UserModel } from 'src/user/user.model'
import { CreateUserDto } from 'src/user/dto/user.dto'
import { ConsoleLogger, Logger } from '@nestjs/common';

type IUser = UserModel

export default class DBUsers extends UserModel {
	async create(dto: CreateUserDto): Promise<IUser> {
		const created: IUser = {
			...dto,
			id: v4(),
			version: 0,
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		// console.log(created);
		return await created
	}
}
