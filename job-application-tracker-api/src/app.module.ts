import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';

const uri= env.DATABASE_CONNECTION_STRING;

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
