import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Facebook' })
    companyName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'coffe maker' })
    position: string;

    @ApiProperty()
    states: any[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '12345' })
    userId: string;
}