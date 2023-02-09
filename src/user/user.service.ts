import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { db } from '../DB/DB'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
	) { }
	private db = db


	getAll() {
		return this.db.getAllUsers()
	}

	async finAll() {
		const users = await this.userRepository.find()
		return users
	}
	async getById(id: string) {
		const currentUser = await this.db.getUserById(id)
		if (!currentUser) {
			throw new Error()
		}
		return currentUser
	}

	async findOne(id: string) {
		const user = await this.userRepository.findOne({ where: { id: id } })
		if (user) { return user }

		throw new NotFoundException(`User with id ${id} is not found`)
	}

	async create(dto: CreateUserDto): Promise<UserEntity> {
		// const checkUser = await this.userRepository.findOne({where: {login: dto.login}})
		// if( checkUser ) { throw new Except}
		const newUser = new UserEntity(dto)
		newUser.login = dto.login
		newUser.password = dto.password
		newUser.id = v4()
		newUser.version = 1
		newUser.createdAt = new Date()
		newUser.updatedAt = new Date()

		return await this.userRepository.save(newUser)
	}

	async update(id: string, dto: UpdatePasswordDto) {
		const userToUpdate = await this.findOne(id)
		if (dto.oldPassword === userToUpdate.password) {
			userToUpdate.password = dto.newPassword
			return await this.userRepository.save(userToUpdate)
		}

		throw new ForbiddenException(`Old password is not match`)
	}

	async delete(id: string) {
		const userDelete = await this.userRepository.delete(id)

		if (userDelete.affected === 0) {
			throw new NotFoundException(`User with id ${id} is not found`)
		}

	}
}
