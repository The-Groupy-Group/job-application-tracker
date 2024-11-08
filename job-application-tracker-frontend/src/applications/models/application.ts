import ApplicationState from "./application-state";

export interface Application {
    id: string;
    companyName: string;
    position: string;
    currentState: ApplicationState;
    userId: string;
}