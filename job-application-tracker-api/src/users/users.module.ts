import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [ConfigModule.forRoot(),
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
    }),
    ]
})
export class UsersModule { }
