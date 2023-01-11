import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ervin321_321',
      database: 'smartcar',
      entities: ['dist/**/entities/*{.ts,.js}'],
      synchronize: true,
      migrations: ['src/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(dataSrc: DataSource) {
    if (dataSrc.isInitialized) console.log('DB is Initialized!');
  }
}
