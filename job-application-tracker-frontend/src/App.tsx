import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./users/Login";
import ProtectedRoute from "./shared/ProtectedRoute ";
import Register from "./users/Register";
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
