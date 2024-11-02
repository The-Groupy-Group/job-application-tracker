import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./users/Login";
import ProtectedRoute from "./shared/ProtectedRoute ";
import usersService from "./users/users.service";
import { useEffect, useState } from "react";
import { JwtPayLoad } from "./shared/jwt-payload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Login component is rendered when the URL path is /login */}
        <Route path="/login" element={<Login />} />
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
  return (
    <>
      home <br />
      You are logged in as <UserEmail />
    </>
  );
}

function UserEmail() {
  const [payload, setPayload] = useState({} as JwtPayLoad);

  useEffect(() => {
    const user = usersService.getTokenPayload();
    setPayload(user);
  }, []);

  return <>Email: {payload.email} Id: {payload.sub}</>;
}

export default App;
