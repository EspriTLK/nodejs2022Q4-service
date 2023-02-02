import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { db } from '../DB/DB'

@Injectable()
export class UserService {
	private db = db
	getAll() {
		return this.db.getAll()
	}

	getById(id: string) {
		return this.db.getById(id)
	}

	async create(dto: CreateUserDto) {
		if (!dto.login || !dto.password) {
			return new Error('not required fields')
		} else {
			const user = await this.db.addData(dto)
			return user
		}

	}

	update(dtp: UpdatePasswordDto) {

	}
}
