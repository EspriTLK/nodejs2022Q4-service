import { IsString, IsNumber, IsOptional, IsUUID, IsNotEmpty } from 'class-validator'

export class AddTrackDto {
	id: string; // uuid v4
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsOptional()
	@IsUUID()
	artistId: string | null; // refers to Artist
	@IsOptional()
	@IsUUID()
	albumId: string | null; // refers to Album
	@IsNumber()
	@IsNotEmpty()
	duration: number; // integer number
}