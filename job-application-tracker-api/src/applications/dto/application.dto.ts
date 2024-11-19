import { ApiProperty } from '@nestjs/swagger';
import { ApplicationState } from "../applications-states/model/application-state.model";


export class ApplicationDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    currentState: ApplicationState;

    @ApiProperty()
    userId: string;
}