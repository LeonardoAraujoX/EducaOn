import React from "react";
import axios from "axios";
import "./ProfessorDashboard.css";

export default function ProfessorDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="logo">EducaOn</h1>
        <div className="top-right">
          <span>Olá, Prof.</span>
          <button className="logout-btn">Sair</button>
        </div>
      </header>

      <section className="profile-card">
        <div className="profile-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
            className="avatar"
          />
          <div>
            <h2>Prof. Carlos Mendes</h2>
            <p>carlos@email.com</p>
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h3>R$ 80,00</h3>
            <span>Preço por hora</span>
          </div>
          <div className="stat-box">
            <h3>240</h3>
            <span>Minutos disponíveis</span>
          </div>
          <div className="stat-box">
            <h3>2</h3>
            <span>Matérias</span>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button className="active">Aulas Agendadas</button>
        <button>Histórico</button>
        <button>Editar Perfil</button>
      </div>

      <section className="next-classes">
        <h2>Próximas Aulas</h2>

        <div className="class-list">
          <div className="class-card">
            <div className="class-header">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" className="student-avatar" />
              <div>
                <h3>Maria Silva</h3>
                <span>Aluno</span>
              </div>
              <span className="status">Agendada</span>
            </div>

            <div className="class-details">
              <p>📅 19 de janeiro de 2025</p>
              <p>⏰ 14:00 – 60 minutos</p>
            </div>

            <div className="class-footer">
              <span className="price">R$ 80,00</span>
              <button className="enter-btn">Entrar na Aula</button>
            </div>
          </div>

          <div className="class-card">
            <div className="class-header">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" className="student-avatar" />
              <div>
                <h3>Maria Silva</h3>
                <span>Aluno</span>
              </div>
              <span className="status">Agendada</span>
            </div>

            <div className="class-details">
              <p>📅 21 de janeiro de 2025</p>
              <p>⏰ 16:00 – 60 minutos</p>
            </div>

            <div className="class-footer">
              <span className="price">R$ 75,00</span>
              <button className="enter-btn">Entrar na Aula</button>
            </div>
          </div>

          <div className="class-card">
            <div className="class-header">
              <img src="https://cdn-icons-png.flaticon.com/512/4140/4140032.png" className="student-avatar" />
              <div>
                <h3>João Santos</h3>
                <span>Aluno</span>
              </div>
              <span className="status">Agendada</span>
            </div>

            <div className="class-details">
              <p>📅 20 de janeiro de 2025</p>
              <p>⏰ 10:00 – 90 minutos</p>
            </div>

            <div className="class-footer">
              <span className="price">R$ 120,00</span>
              <button className="enter-btn">Entrar na Aula</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
