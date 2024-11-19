import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplicationStateDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;

  @IsDate()
  @ApiProperty({ type: Date })
  dueDate: Date;
}