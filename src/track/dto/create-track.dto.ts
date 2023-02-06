import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class AddTrackDto {
	id: string; // uuid v4
	@IsString()
	name: string;
	@IsOptional()
	@IsUUID()
	artistId: string | null; // refers to Artist
	@IsOptional()
	@IsUUID()
	albumId: string | null; // refers to Album
	@IsNumber()
	duration: number; // integer number
}