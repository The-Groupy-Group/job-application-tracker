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
        key={application._id}
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
          <Typography>{application._id}</Typography>
        </Container>

        <ApplicationStateInfo state={application.currentState} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenApplicationCreation}
            sx={{ marginRight: 1 }}
          >
            Add State
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(application._id)}
          >
            Delete
          </Button>
        </Box>
      </Paper>
      <ApplicationStateForm
        applicationId={application._id}
        open={isApplicationCreationOpen}
        onClose={handleCloseApplicationCreation}
        onApplicationStateAdded={(state) => {
          application.currentState = state;
        }}
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
        width: "95%",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{state.title}</Typography>
        <Typography>{state.dueDate.toDateString()}</Typography>
      </Container>
      <Typography sx={{ alignSelf: "center" }}>{state.description}</Typography>
    </Paper>
  );
};

export default ApplicationListItem;
