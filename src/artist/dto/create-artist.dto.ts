import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator'

export class AddArtistDto {
	id: string; // uuid v4
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsOptional()
	@IsBoolean()
	grammy: boolean;
}