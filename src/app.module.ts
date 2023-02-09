import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { dataSourceOptions } from './config/ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
