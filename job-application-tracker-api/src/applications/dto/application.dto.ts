import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    currentState: any;

    @ApiProperty()
    userId: string;
}