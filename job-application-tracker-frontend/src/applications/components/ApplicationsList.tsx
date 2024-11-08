import { useEffect, useState } from "react";
import applicationsService from "../services/applications.service";
import { Application } from "../models/application";
import { Box } from "@mui/material";
import ApplicationListItem from "./ApplicationListItem";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {applications.map((app) => (
        <ApplicationListItem
          key={app.id}
          application={app}
          handleDelete={handleDelete}
        />
      ))}
    </Box>
  );
};
