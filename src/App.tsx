import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CreateGoalsPage from './pages/CreateGoalsPage';
import ChatPage from './pages/ChatPage';
import GoalsPage from './pages/GoalPage';
import GoalDetailsPage from './pages/GoalDetailsPage';
import EditGoalPage from './pages/EditGoalPage';

const App: React.FC = () => {
  useEffect(() => {
    // Simulamos el almacenamiento del JWT (esto es solo temporal)
    localStorage.setItem(
      'jwt',
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwibmFtZSI6InVzZXJFeGFtcGxlIiwidXNlcklkIjoyLCJzdWIiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM4NjI2NDcwLCJleHAiOjE3MzkyMzEyNzB9.SfqAYQoFgCbnOcW61iDaLZ_6dFa9cNzGZSXhj-Cn10c'
    );
  }, []); // Se ejecuta solo una vez cuando se monta el componente

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<GoalsPage />} />
          <Route path="/crear-meta" element={<CreateGoalsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/goal/:id" element={<GoalDetailsPage />} />
          <Route path="/edit-goal/:id" element={<EditGoalPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
