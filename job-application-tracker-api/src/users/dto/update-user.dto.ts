import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}