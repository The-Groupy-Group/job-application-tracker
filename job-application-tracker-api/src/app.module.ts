import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsModule } from './applications/applications.module';

const uri= process.env.DATABASE_CONNECTION_STRING;;

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(uri),
    ApplicationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
