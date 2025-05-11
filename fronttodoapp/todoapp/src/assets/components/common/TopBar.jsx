import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, ArrowRightOnRectangleIcon,PlusIcon,ListBulletIcon} from '@heroicons/react/24/solid';

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddTodo = () => {
    navigate('/todo');
  };

  const handleViewTodos = () => {
    navigate('/todos');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="w-full py-4 px-6 flex justify-between items-center shadow-md bg-gray-800 text-gray-800">
      <h1 className="text-xl font-bold text-white">Todo Uygulaması</h1>
      <div className="flex items-center space-x-4">
        {/* Dashboard Butonu */}
        <button
          onClick={handleGoToDashboard}
          className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-400 text-gray-800"
        >
              <HomeIcon className="h-6 w-6 text-gray-800" />
        </button>

        {/* Eğer rota '/todo' ise "Todolarım" butonu göster, değilse "Todo Ekle" butonu */}
        {location.pathname === '/todo' ? (
          <button
            onClick={handleViewTodos}
            className="px-4 py-2 rounded-lg bg-indigo-300 hover:bg-green-400 text-gray-800"
          >
            <ListBulletIcon className="h-6 w-6 text-gray-800" />
          </button>
        ) : (
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 rounded-lg bg-green-300 hover:bg-indigo-400 text-gray-800"
          >
             <PlusIcon className="h-6 w-6 text-gray-800" />
          </button>
        )}

        {/* Logout Butonu */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-300 hover:bg-red-400 text-gray-800"
        >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;