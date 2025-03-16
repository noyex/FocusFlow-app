import React from 'react';
import Navbar from '../components/layout/Navbar';
import '../styles/pages/WorkspacePage.css';

const WorkspacePage = () => {
  return (
    <div className="workspace-page">
      <Navbar navType="dashboard" />
      
      <div className="workspace-content">
        <div className="workspace-header">
          <h1>Twoja przestrzeń robocza</h1>
          <p>Zarządzaj swoimi zadaniami, notatkami i projektami w jednym miejscu</p>
        </div>
        
        <div className="workspace-grid">
          <div className="workspace-section tasks-section">
            <h2>Zadania</h2>
            <div className="workspace-card">
              <div className="task-list">
                <div className="task-item">
                  <input type="checkbox" id="task1" />
                  <label htmlFor="task1">Dokończyć projekt FocusFlow</label>
                </div>
                <div className="task-item">
                  <input type="checkbox" id="task2" />
                  <label htmlFor="task2">Przygotować prezentację</label>
                </div>
                <div className="task-item">
                  <input type="checkbox" id="task3" />
                  <label htmlFor="task3">Spotkanie z zespołem</label>
                </div>
              </div>
              <button className="add-task-btn">+ Dodaj zadanie</button>
            </div>
          </div>
          
          <div className="workspace-section notes-section">
            <h2>Notatki</h2>
            <div className="workspace-card">
              <div className="notes-list">
                <div className="note-item">
                  <h3>Pomysły na rozwój aplikacji</h3>
                  <p>Dodać funkcję kalendarza, integrację z Trello, powiadomienia...</p>
                </div>
                <div className="note-item">
                  <h3>Spotkanie 15.03</h3>
                  <p>Omówić postępy, zaplanować kolejne kroki, przydzielić zadania...</p>
                </div>
              </div>
              <button className="add-note-btn">+ Dodaj notatkę</button>
            </div>
          </div>
          
          <div className="workspace-section timer-section">
            <h2>Timer fokusowy</h2>
            <div className="workspace-card">
              <div className="timer-display">
                <span className="timer-value">25:00</span>
              </div>
              <div className="timer-controls">
                <button className="timer-btn start-btn">Start</button>
                <button className="timer-btn reset-btn">Reset</button>
              </div>
              <div className="timer-settings">
                <label>
                  Czas fokusowania:
                  <select>
                    <option value="25">25 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          
          <div className="workspace-section projects-section">
            <h2>Projekty</h2>
            <div className="workspace-card">
              <div className="projects-list">
                <div className="project-item">
                  <h3>FocusFlow</h3>
                  <div className="project-progress">
                    <div className="progress-bar" style={{ width: '75%' }}></div>
                    <span>75%</span>
                  </div>
                </div>
                <div className="project-item">
                  <h3>Aplikacja mobilna</h3>
                  <div className="project-progress">
                    <div className="progress-bar" style={{ width: '30%' }}></div>
                    <span>30%</span>
                  </div>
                </div>
              </div>
              <button className="view-all-btn">Zobacz wszystkie projekty</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage; 