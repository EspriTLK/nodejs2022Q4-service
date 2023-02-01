import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, Res } from '@nestjs/common';
import DB from 'src/DB/DB';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserModel } from './user.model';

const db = new DB();

@Controller('user')
export class UserController {

	@Get()
	async getUsers() {
		return db.getAll()
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {

	}

	@Post()
	async addUser(@Body() dto: CreateUserDto, @Res() res) {
		if (!dto.login || !dto.password) {
			res.status(400).send(`required fields doesn't exist`);
			// return ('ERRORRRR!!!!!!!!');
		} else {
			res.status(200).send(`ass user ${dto}`);
			return db.addData(dto)
		}
		console.log(dto)
	}

	@HttpCode(200)
	@Put(':id')
	async changePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {

	}
}
