import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationRepository } from './application.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './models/application.model';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers:[ApplicationsController],
    providers:[ApplicationsService,ApplicationRepository,UsersService,JwtModule],
    imports:[
        MongooseModule.forFeature([{
            name:Application.name,
            schema:ApplicationSchema,      
         }]),
    ]
})
export class ApplicationsModule {}
