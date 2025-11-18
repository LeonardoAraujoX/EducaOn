// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/Register";
import Aluno from "../pages/Aluno";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
         <Route path="/registrar" element={<Register/>} />
         <Route path="/aluno" element={<Aluno/>} />
      </Routes>
    </BrowserRouter>
  );
}
