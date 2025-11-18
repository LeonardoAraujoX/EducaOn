import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
      { path: "/", label: "Home" },
      { path: "/login", label: "Login" },
      { path: "/dashboard-aluno", label: "Dashboard Aluno" },
      { path: "/dashboard-professor", label: "Dashboard Professor" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎓 Meu Sistema
        </Link>
        
        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
              {isActive(item.path) && <span className="active-indicator"></span>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;