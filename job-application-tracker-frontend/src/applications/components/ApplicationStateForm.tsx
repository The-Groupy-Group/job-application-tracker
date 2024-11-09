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
import ApplicationState from "../models/application-state";

interface ApplicationStateFormProps {
  applicationId: string;
  open: boolean;
  onClose: () => void;
  onApplicationStateAdded: () => void;
}

const ApplicationStateForm = ({
  applicationId,
  open,
  onClose: handleClose,
  onApplicationStateAdded: onApplicationCreated,
}: ApplicationStateFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  let applicationCreationR;

  return (
    <Dialog
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle component="h1" variant="h5">
        Add State
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
            placeholder="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="text"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            id="dueDate"
            value={dueDate.toISOString().split("T")[0]}
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const state: ApplicationState = {
                title,
                description,
                dueDate,
              };
              applicationsService
                .addApplicationState(
                  applicationId,
                  state,
                )
                .then(() => {
                  setTitle("");
                  setDescription("");
                  setDueDate(new Date());
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

export default ApplicationStateForm;
