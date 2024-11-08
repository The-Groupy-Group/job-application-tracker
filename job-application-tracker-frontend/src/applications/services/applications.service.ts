import { AxiosInstance } from "axios";
import apiClient from "../../shared/api-client";
import { Application } from ".././models/application";
import { CreateApplicationRequest } from ".././models/create-application-request";
import { UpdateApplicationRequest } from ".././models/update-application-request";
import { ApplicationsLocalService } from "./applications-local.service";

export class ApplicationsService {
  constructor(private readonly apiClient: AxiosInstance) {}

  async getApplications(): Promise<Application[]> {
    return await this.apiClient.get(`applications`);
  }

  async getApplication(id: string): Promise<Application> {
    return await this.apiClient.get(`applications/${id}`);
  }

  async createApplication(
    request: CreateApplicationRequest
  ): Promise<Application> {
    return await this.apiClient.post(`applications`, request);
  }

  async updateApplication(
    id: string,
    request: UpdateApplicationRequest
  ): Promise<Application> {
    return await this.apiClient.put(`applications/${id}`, request);
  }

  async deleteApplication(id: string): Promise<void> {
    await this.apiClient.delete(`applications/${id}`);
  }
}

// TODO: remove this function and use the ApplicationsService class directly when the API is ready
function createApplicationsService(): ApplicationsService {
  if (process.env.REACT_APP_LOCAL_APP_SERVICE === "true") {
    const { ApplicationsLocalService } = require("./applications-local.service");
    return new ApplicationsLocalService();
  }
  return new ApplicationsService(apiClient);
}

const applicationsService = createApplicationsService();

export default applicationsService;