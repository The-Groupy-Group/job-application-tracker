import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import applicationsService from "../services/applications.service";

interface ApplicationCreationFormProps {
  open: boolean;
  handleClose: () => void;
  onApplicationCreated: () => void;
}

const ApplicationCreationForm = ({
  open,
  handleClose,
  onApplicationCreated,
}: ApplicationCreationFormProps) => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");

  return (
    <Dialog
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle component="h1" variant="h5">
        Create Application
      </DialogTitle>
      <DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            mt: 1,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            placeholder="Company Name"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            placeholder="Position"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              applicationsService
                .createApplication({
                  companyName,
                  position,
                })
                .then(() => {
                  setCompanyName("");
                  setPosition("");
                  onApplicationCreated();
                  handleClose();
                });
            }}
          >
            Create
          </Button>
        </Box>
      </DialogContentText>
    </Dialog>
  );
};

export default ApplicationCreationForm;
