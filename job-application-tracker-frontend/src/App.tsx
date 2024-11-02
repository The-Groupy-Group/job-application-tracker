import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./users/Login";
import ProtectedRoute from "./shared/ProtectedRoute ";
import usersService from "./users/users.service";
import { useEffect, useState } from "react";
import { JwtPayLoad } from "./shared/jwt-payload";
import Register from "./users/Register";
import { Button } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Login component is rendered when the URL path is /login */}
        <Route path="/login" element={<Login />} />
        {/* The register component is rendered when the URL path is /register */}
        <Route path="/register" element={<Register />} />
        {/* The ProtectedRoute component is rendered when the URL path is / */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <>
      home <br />
      You are logged in as <UserEmail />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          usersService.logout();
          window.location.reload();
        }}
      >
        Log out
      </Button>
    </>
  );
}

function UserEmail() {
  const [payload, setPayload] = useState({} as JwtPayLoad);

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

export default App;
