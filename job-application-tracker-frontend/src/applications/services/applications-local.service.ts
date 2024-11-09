import { ApplicationsService } from "./applications.service";
import { Application } from "../models/application";
import { CreateApplicationRequest } from "../models/create-application-request";
import { UpdateApplicationRequest } from "../models/update-application-request";
import ApplicationState from "../models/application-state";

// TODO: remove this class when the API is ready
export class ApplicationsLocalService extends ApplicationsService {
  private applications: Application[];
  constructor() {
    super(null!);
    this.applications = [
      {
        id: "1",
        companyName: "Google",
        position: "Software Engineer",
        userId: "1",
        currentState: {
          title: "Applied",
          description: "You have applied to this position",
          dueDate: new Date(),
        },
      },
      {
        id: "2",
        companyName: "Facebook",
        position: "Product Manager",
        userId: "1",
        currentState: {
          title: "Applied",
          description: "You have applied to this position",
          dueDate: new Date(),
        },
      },
    ];
  }
  async getApplications(): Promise<Application[]> {
    return this.applications;
  }

  async getApplication(id: string): Promise<Application> {
    return this.applications.find((app) => app.id === id)!;
  }

  async createApplication(
    request: CreateApplicationRequest
  ): Promise<Application> {
    const newApplication: Application = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      userId: "1",
      currentState: {
        title: "Applied",
        description: "You have applied to this position",
        dueDate: new Date(),
      },
    };

    this.applications.push(newApplication);

    return newApplication;
  }

  async updateApplication(
    id: string,
    request: UpdateApplicationRequest
  ): Promise<Application> {
    const application = this.applications.find((app) => app.id === id);

    if (!application) {
      throw new Error("Application not found");
    }

    const updatedApplication = {
      ...application,
      ...request,
    };

    this.applications = this.applications.map((app) =>
      app.id === id ? updatedApplication : app
    );

    return updatedApplication;
  }

  async deleteApplication(id: string): Promise<void> {
    this.applications = this.applications.filter((app) => app.id !== id);
  }

  async addApplicationState(
    applicationId: string,
    state: ApplicationState
  ): Promise<Application> {
    const application = this.applications.find((app) => app.id === applicationId);

    if (!application) {
      throw new Error("Application not found");
    }

    const updatedApplication = {
      ...application,
      currentState: state,
    };

    this.applications = this.applications.map((app) =>
      app.id === applicationId ? updatedApplication : app
    );

    return updatedApplication;
  }
}