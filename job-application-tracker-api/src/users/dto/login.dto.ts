import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
}