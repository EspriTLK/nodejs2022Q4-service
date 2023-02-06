import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { userErrors } from './user.constants';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { validate } from 'uuid'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

	constructor(private readonly userService: UserService) {

	}

	@Get()
	@SerializeOptions({ excludePrefixes: ['password'] })
	async getUsers(): Promise<UserEntity[]> {
		return await this.userService.getAll()
	}

	@Get(':id')
	async getUser(@Param('id') id: string): Promise<UserEntity> {
		console.log("[getUser]", { id, validation: !validate(id) });

		if (!validate(id)) {
			throw new HttpException(userErrors.USER_ID_IS_NOT_VALID, HttpStatus.BAD_REQUEST)
		}

		try {
			return new UserEntity(await this.userService.getById(id))
		} catch (err) {
			throw new HttpException(userErrors.USER_IS_NOT_EXISTS, HttpStatus.NOT_FOUND)
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async addUser(@Body() dto: CreateUserDto) {
		if (!dto.login || !dto.password) {
			throw new HttpException(userErrors.REQIRE_FIELDS_NO_EXISTS, HttpStatus.BAD_REQUEST)
		}
		try {
			return new UserEntity(await this.userService.create(dto))
		} catch (error) {
			return error.message
		}

	}

	@HttpCode(200)
	@Put(':id')
	async changePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
		if (!dto.oldPassword || !dto.newPassword) {
			throw new HttpException(userErrors.REQIRE_FIELDS_NO_EXISTS, HttpStatus.BAD_REQUEST)
		}
		await this.getUser(id).then(async (user) => {
			if (user.password !== dto.oldPassword) {
				throw new HttpException(userErrors.OLD_PASSWORD_IS_WRONG, HttpStatus.FORBIDDEN)
			}


			await this.userService.update(id, dto)
		})

		return new UserEntity(await this.getUser(id))
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.getUser(id).then(async (user) => {
			await this.userService.delete(user.id)
		})
		return 'user deleted'
	}
}
