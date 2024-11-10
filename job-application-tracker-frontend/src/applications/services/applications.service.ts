import { AxiosInstance } from "axios";
import apiClient from "../../shared/api-client";
import { Application } from ".././models/application";
import { CreateApplicationRequest } from ".././models/create-application-request";
import { UpdateApplicationRequest } from ".././models/update-application-request";
import ApplicationState from "../models/application-state";

export class ApplicationsService {
  constructor(private readonly apiClient: AxiosInstance) {}

  async getApplications(): Promise<Application[]> {
   const response = await this.apiClient.get("applications");
    return response.data;
  }

  async getApplication(id: string): Promise<Application> {
    const response = await this.apiClient.get(`applications/${id}`);
    return response.data;
  }

  async createApplication(
    request: CreateApplicationRequest
  ): Promise<Application> {
    const response = await this.apiClient.post("applications", request);
    return response.data;
  }

  async updateApplication(
    id: string,
    request: UpdateApplicationRequest
  ): Promise<Application> {
    const response = await this.apiClient.put(`applications/${id}`, request);
    return response.data;
  }

  async deleteApplication(id: string): Promise<void> {
    await this.apiClient.delete(`applications/${id}`);
  }

  async addApplicationState(
    applicationId: string,
    state: ApplicationState
  ): Promise<Application> {
    return await this.apiClient.post(
      `applications/${applicationId}/states`,
      state
    );
  }
}

// function createApplicationsService(): ApplicationsService {
//   if (process.env.REACT_APP_LOCAL_APP_SERVICE === "true") {
//     const {
//       ApplicationsLocalService,
//     } = require("./applications-local.service");
//     return new ApplicationsLocalService();
//   }
//   return new ApplicationsService(apiClient);
// }

// const applicationsService = createApplicationsService();

// export default applicationsService;

export default new ApplicationsService(apiClient);
