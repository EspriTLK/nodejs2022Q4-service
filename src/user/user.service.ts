import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>
	) { }

	async finAll() {
		const users = await this.userRepository.find()
		return users
	}

	async findOne(id: string) {
		const user = await this.userRepository.findOne({ where: { id: id } })
		if (user) { return user }

		throw new NotFoundException(`User with id ${id} is not found`)
	}

	async create(dto: CreateUserDto): Promise<UserEntity> {
		const newUser = new UserEntity(dto)
		return await this.userRepository.save(newUser)
	}

	async update(id: string, dto: UpdatePasswordDto) {
		const userToUpdate = await this.findOne(id)
		if (dto.oldPassword === userToUpdate.password) {
			userToUpdate.password = dto.newPassword
			userToUpdate.version++
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
