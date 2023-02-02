import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { db } from '../DB/DB'

@Injectable()
export class UserService {
	private db = db
	getAll() {
		return this.db.getAllUsers()
	}

	async getById(id: string) {
		const currentUser = await this.db.getUserById(id)
		if (!currentUser) {
			throw new Error()
		}
		return currentUser
	}

	async create(dto: CreateUserDto) {
		const user = await this.db.createUser(dto)
		return user
	}

	async update(id: string, dto: UpdatePasswordDto) {
		const changedUser = await this.db.updateUserPassword(id, dto)
		if (!changedUser) {
			console.log('[from service]')
			throw new Error('service')
		}
		return changedUser
	}

	async delete(id: string) {
		const userDelete = await this.db.removeUser(id)
		return userDelete
	}
}
