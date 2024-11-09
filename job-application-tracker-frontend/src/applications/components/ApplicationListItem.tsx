import { Box, Button, Container, Paper, Typography } from "@mui/material";
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
    <>
      <Paper
        key={application.id}
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          margin: 2,
          border: 1,
        }}
      >
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            {application.position} - {application.companyName}
          </Typography>
          <Typography>{application.id}</Typography>
        </Container>

        <ApplicationStateInfo state={application.currentState} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenApplicationCreation}
        >
          Add State
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(application.id)}
        >
          Delete
        </Button>
      </Paper>
      <ApplicationStateForm
        applicationId={application.id}
        open={isApplicationCreationOpen}
        onClose={handleCloseApplicationCreation}
        onApplicationStateAdded={() => {}}
      />
    </>
  );
};

const ApplicationStateInfo: React.FC<{ state: ApplicationState }> = ({
  state,
}) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 2,
      }}
    >
      <Typography>{state.title}</Typography>
      <Typography>{state.description}</Typography>
      <Typography>{state.dueDate.toDateString()}</Typography>
    </Paper>
  );
};

export default ApplicationListItem;
