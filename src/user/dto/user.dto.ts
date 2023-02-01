export class CreateUserDto {
	login: string;
	password: string;
}

export class UpdatePasswordDto {
	oldPassword: string; // previous password
	newPassword: string; // new password
}