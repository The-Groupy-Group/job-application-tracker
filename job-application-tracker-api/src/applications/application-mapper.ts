import { Application } from "./models/application.model";
import { ApplicationDto } from "./dto/application.dto";


export class ApplicationMapper {
    static toApplicationDto(application: Application): ApplicationDto {
        return {
            id: application._id,
            companyName: application.companyName,
            position: application.position,
            currentState: application.states.slice(-1)[0] ,
            userId: application.userId
        };
    }
}