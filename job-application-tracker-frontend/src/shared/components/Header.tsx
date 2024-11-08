import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import usersService from "../../users/services/users.service";
import { useEffect, useState } from "react";
import { TokenPayload } from "../models/jwt-payload";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Application Tracker
        </Typography>
        <UserDetails />
        <Button
          color="error"
          onClick={logOut}
          variant="contained"
          sx={{ mt: 3, mb: 2, ml: 4 }}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

function UserDetails() {
  const [payload, setPayload] = useState<TokenPayload>({} as TokenPayload);

  useEffect(() => {
    const user = usersService.getTokenPayload();
    setPayload(user);
  }, []);

  return (
    <>
      Email: {payload.email} Id: {payload.sub}
    </>
  );
}

function logOut() {
  usersService.logout();
  window.location.reload();
}

export default Header;
