import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	SerializeOptions,
	UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@SerializeOptions({ excludePrefixes: ['password'] })
	async getUsers(): Promise<UserEntity[]> {
		return await this.userService.finAll();
	}

	@Get(':id')
	async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
		try {
			return new UserEntity(await this.userService.findOne(id));
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.NOT_FOUND);
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async addUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
		try {
			return new UserEntity(await this.userService.create(dto));
		} catch (error) {
			console.log(error.message);

			return error.message;
		}
	}

	@HttpCode(200)
	@Put(':id')
	async changePassword(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdatePasswordDto,
	) {
		return new UserEntity(await this.userService.update(id, dto));
	}

	@HttpCode(204)
	@Delete(':id')
	async delete(@Param('id', ParseUUIDPipe) id: string) {
		await this.userService.delete(id);
	}
}
