import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './user.repository';


@Module({
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    imports:
        [MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ]),
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        ],
        exports:[UsersService]
})
export class UsersModule { }
