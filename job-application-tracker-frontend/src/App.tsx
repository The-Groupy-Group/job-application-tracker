import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./users/Login";
import ProtectedRoute from "./shared/ProtectedRoute ";
import usersService from "./users/users.service";
import { useEffect, useState } from "react";
import { TokenPayload } from "./shared/jwt-payload";
import Register from "./users/Register";
import { Button } from "@mui/material";
import { ApplicationsPage } from "./applications/ApplicationsPage";
import Header from "./shared/Header";

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
  return (
    <>
      <Header />
      <ApplicationsPage />
    </>
  );
}

export default App;
