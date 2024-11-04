import { useEffect, useState } from "react";
import applicationsService from "./applications-local.service";
import { Application } from "./models/application";
import { CreateApplicationRequest } from "./models/create-application-request";
import { UpdateApplicationRequest } from "./models/update-application-request";

export const ApplicationsList = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    applicationsService.getApplications().then((data) => {
      setApplications(data);
    });
  }, []);

  const handleDelete = (id: string) => {
    applicationsService.deleteApplication(id).then(() => {
      setApplications(applications.filter((app) => app.id !== id));
    });
  };

  return (
    <div>
      <h1>Applications</h1>
        <button
            onClick={() => {
            const newApp: CreateApplicationRequest = {
                companyName: "New Company",
                position: "New Position",
                userId: "1",
            };
            applicationsService.createApplication(newApp).then((app) => {
                setApplications([...applications, app]);
            });
            }}>Create application </button>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <h2>{app.companyName}</h2>
            <p>{app.position}</p>
            <button onClick={() => handleDelete(app.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
