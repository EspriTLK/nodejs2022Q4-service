import { IsString, IsOptional, IsBoolean, IsNumber, IsUUID } from 'class-validator'

export class UpdateAlbumDto {
	id: string; // uuid v4
	@IsOptional()
	@IsString()
	name: string;
	@IsOptional()
	@IsNumber()
	year: number;
	@IsOptional()
	@IsUUID()
	artistId: string;
}