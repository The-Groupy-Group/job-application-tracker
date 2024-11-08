import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./users/components/Login";
import ProtectedRoute from "./shared/components/ProtectedRoute ";
import Register from "./users/components/Register";
import { ApplicationsPage } from "./applications/components/ApplicationsPage";
import Header from "./shared/components/Header";

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
