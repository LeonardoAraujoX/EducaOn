// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ProfessorDashboard from "../pages/ProfessorDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
