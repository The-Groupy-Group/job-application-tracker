import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'HerziHalevi'})
    userName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Herzi', description: 'first name'})
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "HaLevi", description: 'family name'})
    lastName: string;

    @IsEmail()
    @ApiProperty({ example: 'HerziHalevi@mail.com', description: 'user email'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456*', description: 'secret password'})
    password: string;
}