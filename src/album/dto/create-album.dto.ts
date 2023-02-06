import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator'

export class AddAlbumDto {
	id: string; // uuid v4
	@IsString()
	name: string;
	@IsNumber()
	year: number;
	@IsOptional()
	@IsUUID()
	artistId: string | null;
}