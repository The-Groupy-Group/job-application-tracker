import ApplicationState from "./application-state";

export interface Application {
  _id: string;
  companyName: string;
  position: string;
  currentState: ApplicationState;
  userId: string;
}
