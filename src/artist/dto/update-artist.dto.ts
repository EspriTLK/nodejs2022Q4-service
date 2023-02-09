import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator'

export class UpdateArtistDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsOptional()
	@IsBoolean()
	grammy: boolean;
}