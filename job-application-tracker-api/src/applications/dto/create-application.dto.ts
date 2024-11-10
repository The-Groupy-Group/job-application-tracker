import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Facebook' })
    companyName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'coffee maker' })
    position: string;

}