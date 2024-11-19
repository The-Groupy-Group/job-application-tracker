import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStateDto } from '../applications-states/dto/application-state.dto';


export class ApplicationDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    currentState: ApplicationStateDto;

    @ApiProperty()
    userId: string;
}