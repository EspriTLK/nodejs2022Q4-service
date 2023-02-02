import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import DB from 'src/DB/DB';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) {

	}

	@Get()
	async getUsers() {
		return await this.userService.getAll()
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return await this.userService.getById(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@HttpCode(HttpStatus.BAD_REQUEST)
	async addUser(@Body() dto: CreateUserDto, @Res() res) {
		// return await this.userService.create(dto)
		if (!dto.login || !dto.password) {
			res.status(400).send({ status: res.statusCode, message: 'required fields are incorrect' })
			return { status: res.statusCode, message: 'ololo' }
		}
		try {
			res.send(await this.userService.create(dto))
			// return await this.userService.create(dto)
		} catch (error) {
			return error.message
		}

	}

	@HttpCode(200)
	@Put(':id')
	async changePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {

	}
}
