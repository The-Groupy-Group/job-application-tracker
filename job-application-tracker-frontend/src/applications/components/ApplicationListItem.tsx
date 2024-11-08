import { Box, Button, Typography } from "@mui/material";
import { Application } from "../models/application";
import ApplicationState from "../models/application-state";
import { useState } from "react";
import ApplicationStateForm from "./ApplicationStateForm";

interface ApplicationListItemProps {
  application: Application;
  onDelete: (id: string) => void;
}

const ApplicationListItem: React.FC<ApplicationListItemProps> = ({
  application,
  onDelete,
}: ApplicationListItemProps) => {
  const [isApplicationCreationOpen, setIsApplicationCreationOpen] =
    useState(false);

  const handleCloseApplicationCreation = () => {
    setIsApplicationCreationOpen(false);
  };

  const handleOpenApplicationCreation = () => {
    setIsApplicationCreationOpen(true);
  };

  return (
    <Box
      key={application.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
        padding: 2,
        margin: 2,
      }}
    >
      <Typography variant="h6">{application.companyName}</Typography>
      <Typography>{application.position}</Typography>
      <ApplicationStateInfo state={application.currentState} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenApplicationCreation}
      >
        Add State
      </Button>
      <ApplicationStateForm
        open={isApplicationCreationOpen}
        onClose={handleCloseApplicationCreation}
        onApplicationStateAdded={() => {}}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onDelete(application.id)}
      >
        Delete
      </Button>
    </Box>
  );
};

const ApplicationStateInfo: React.FC<{ state: ApplicationState }> = ({
  state,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography>{state.title}</Typography>
      <Typography>{state.description}</Typography>
      <Typography>{state.dueDate.toDateString()}</Typography>
    </Box>
  );
};

export default ApplicationListItem;
