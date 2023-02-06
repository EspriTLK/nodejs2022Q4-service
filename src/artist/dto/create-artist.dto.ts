import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class AddArtistDto {
	id: string; // uuid v4
	@IsString()
	name: string;
	@IsOptional()
	@IsBoolean()
	grammy: boolean;
}