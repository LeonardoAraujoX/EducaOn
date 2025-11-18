// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import ProfessorDashboard from "../pages/ProfessorDashboard";
import Register from "../pages/Register";
import Aluno from "../pages/Aluno";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/aluno-dashboard" element={<Aluno />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
       
      </Routes>
    </BrowserRouter>
  );
}
