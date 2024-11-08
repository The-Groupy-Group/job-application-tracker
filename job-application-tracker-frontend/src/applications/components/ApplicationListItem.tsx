import * as mui from "@mui/material";
import { Application } from "../models/application";
import ApplicationState from "../models/application-state";

interface ApplicationListItemProps {
  application: Application;
  handleDelete: (id: string) => void;
}

const ApplicationListItem: React.FC<ApplicationListItemProps> = ({
  application,
  handleDelete,
}: ApplicationListItemProps) => {
  return (
    <mui.Box
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
      <mui.Typography variant="h6">{application.companyName}</mui.Typography>
      <mui.Typography>{application.position}</mui.Typography>
      <ApplicationStateInfo state={application.currentState} />

      <mui.Button
        variant="contained"
        color="secondary"
        onClick={() => handleDelete(application.id)}
      >
        Delete
      </mui.Button>
    </mui.Box>
  );
};

const ApplicationStateInfo: React.FC<{ state: ApplicationState }> = ({
  state,
}) => {
  return (
    <mui.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <mui.Typography>{state.title}</mui.Typography>
      <mui.Typography>{state.description}</mui.Typography>
      <mui.Typography>{state.dueDate.toDateString()}</mui.Typography>
    </mui.Box>
  );
};

export default ApplicationListItem;
