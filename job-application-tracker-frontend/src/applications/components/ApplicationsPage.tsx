import { Container, CssBaseline, Box, Typography, Button } from "@mui/material";
import { ApplicationsList } from "./ApplicationsList";
import { useEffect, useState } from "react";
import ApplicationCreationForm from "./ApplicationCreationForm";
import { Application } from "../models/application";
import applicationsService from "../services/applications.service";

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationCreationOpen, setApplicationCreationOpen] = useState(false);

  const handleClose = () => {
    setApplicationCreationOpen(false);
  };

  const handleOpen = () => {
    setApplicationCreationOpen(true);
  };

  const onApplicationCreated = () => {
    applicationsService.getApplications().then((data) => {
      setApplications(data);
    });
  };

  const onApplicationDeleted = (id: string) => {
    applicationsService.deleteApplication(id).then(() => {
      setApplications(applications.filter((app) => app.id !== id));
    });
  };

  useEffect(() => {
    applicationsService.getApplications().then((data) => {
      setApplications(data);
    });
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Applications
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginTop: 2 }}
          >
            Create Application
          </Button>

          <ApplicationsList
            applications={applications}
            handleDelete={onApplicationDeleted}
          />
        </Box>
      </Container>
      <ApplicationCreationForm
        open={applicationCreationOpen}
        handleClose={handleClose}
        onApplicationCreated={onApplicationCreated}
      />
    </>
  );
};
