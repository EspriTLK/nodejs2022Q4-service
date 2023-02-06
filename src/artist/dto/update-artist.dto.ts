import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class UpdateArtistDto {
	id: string; // uuid v4
	@IsOptional()
	@IsString()
	name: string;
	@IsOptional()
	@IsBoolean()
	grammy: boolean;
}