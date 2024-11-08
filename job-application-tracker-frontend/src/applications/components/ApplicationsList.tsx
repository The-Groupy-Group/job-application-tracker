import { useEffect, useState } from "react";
import applicationsService from "../services/applications.service";
import { Application } from "../models/application";
import { Box } from "@mui/material";
import ApplicationListItem from "./ApplicationListItem";

interface ApplicationsListProps {
  applications: Application[];
  handleDelete: (id: string) => void;
}

export const ApplicationsList = ({
  applications,
  handleDelete,
}: ApplicationsListProps) => {
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
