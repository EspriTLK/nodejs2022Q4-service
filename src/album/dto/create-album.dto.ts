import { IsString, IsOptional, IsNumber, IsUUID, IsNotEmpty } from 'class-validator'

export class AddAlbumDto {
	id: string; // uuid v4
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsNumber()
	@IsNotEmpty()
	year: number;
	@IsOptional()
	@IsUUID()
	artistId: string | null;
}