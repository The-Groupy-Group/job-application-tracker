import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import applicationsService from "../services/applications.service";

const ApplicationCreationForm = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
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
          }}
        >
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Position"
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
