import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class UpdateTrackDto {
	// id: string; // uuid v4
	@IsOptional()
	@IsString()
	name: string;
	@IsOptional()
	@IsUUID()
	artistId: string | null; // refers to Artist
	@IsOptional()
	@IsUUID()
	albumId: string | null; // refers to Album
	@IsOptional()
	@IsNumber()
	duration: number; // integer number
}