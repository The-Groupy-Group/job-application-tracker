import { Container, CssBaseline, Box, Typography, Button } from "@mui/material";
import { ApplicationsList } from "./ApplicationsList";
import { useState } from "react";
import ApplicationCreationForm from "./ApplicationCreationForm";

export const ApplicationsPage = () => {
  const [applicationCreationOpen, setApplicationCreationOpen] = useState(false);
  const handleClose = () => {
    setApplicationCreationOpen(false);
  };
  const handleOpen = () => {
    setApplicationCreationOpen(true);
  };

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

          <ApplicationCreationForm
            open={applicationCreationOpen}
            handleClose={handleClose}
          />
          <ApplicationsList />
        </Box>
      </Container>
    </>
  );
};
