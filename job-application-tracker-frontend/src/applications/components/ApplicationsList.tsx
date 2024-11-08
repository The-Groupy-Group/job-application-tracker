import { useEffect, useState } from "react";
import applicationsService from "../services/applications.service";
import { Application } from "../models/application";
import { Box } from "@mui/material";
import ApplicationListItem from "./ApplicationListItem";

interface ApplicationsListProps {
  applications: Application[];
  onApplicationDeleted: (id: string) => void;
}

export const ApplicationsList = ({
  applications,
  onApplicationDeleted,
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
          onDelete={onApplicationDeleted}
        />
      ))}
    </Box>
  );
};
