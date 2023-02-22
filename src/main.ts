import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const PORT = config.get('PORT') || 4444;
	const DBPORT = config.get('POSTGRES_PORT') || 5432;
	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
	);
	await app.listen(PORT, () =>
		console.log(`App runing on port ${PORT} and DB running on port ${DBPORT}`),
	);
}
bootstrap();
