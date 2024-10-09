import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    userName:string;
    
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}