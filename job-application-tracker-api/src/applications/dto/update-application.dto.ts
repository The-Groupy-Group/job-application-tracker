import { IsNotEmpty,IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    position: string;

    @ApiProperty()
    states: any[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId?: string;
}