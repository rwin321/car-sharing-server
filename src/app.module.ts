import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ComponentsModule } from './components/components.module';
import { ApolloDriver } from '@nestjs/apollo';
import { configuration } from 'config/configuration';
import { validationSchema } from 'config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV === 'development',
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
