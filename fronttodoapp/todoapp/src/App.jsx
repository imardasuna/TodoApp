import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterForm from './assets/components/RegisterForm';
import LoginForm from './assets/components/LoginForm';
import TodoForm from './assets/pages/TodoForm';
import TodoList from './assets/pages/TodoList';
import TopBar from './assets/components/common/TopBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './assets/pages/Dashboard';
import TooManyRequests from './assets/pages/TooManyRequests';
import PrivateRoute from './assets/components/common/PrivateRoute';
import { setNavigate } from './axios';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const navigate = useNavigate();
  setNavigate(navigate); // navigate işlevini burada ayarla

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <ConditionalTopBar />
        <div className="flex-grow">
          <Routes>
            {/* Giriş yapılmamış kullanıcılar için açık rotalar */}
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/429" element={<TooManyRequests />} />

            {/* Giriş yapılmış kullanıcılar için korumalı rotalar */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <PrivateRoute>
                  <TodoForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

// Koşullu TopBar Bileşeni
const ConditionalTopBar = () => {
  const location = useLocation();

  // TopBar'ı gizlemek istediğiniz rotalar
  const hiddenRoutes = ['/login', '/register'];

  // Eğer mevcut rota gizlenmesi gereken rotalardan biriyse TopBar'ı gösterme
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return <TopBar />;
};

export default App;