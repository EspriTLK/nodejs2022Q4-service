import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST as string,
	port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
	username: process.env.POSTGRES_USER as string,
	password: process.env.POSTGRES_PASSWORD as string,
	database: process.env.POSTGRES_DB as string,
	synchronize: false,
	entities: ['dist/**/entities/*.entity{.js, .ts}'],
	migrations: ['dist/migrations/*{.js, .ts}'],
	migrationsRun: true,
	logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
