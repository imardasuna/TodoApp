import React, { useEffect, useState } from 'react';
import Card from '../components/common/card';
import useTodos from '../hooks/useTodos';
import StatusBadge from '../components/common/StatusBadge';

const Dashboard = () => {
  const { todos, fetchTodos, updateTodo,handleStatusChange } = useTodos();
  const [upcomingTodos, setUpcomingTodos] = useState([]);

  useEffect(() => {
    fetchTodos(); // Todo'ları yükle
  }, []);

  useEffect(() => {
    // Yaklaşan bitiş tarihlerini filtrele (örneğin, 7 gün içinde bitiş tarihi olanlar)
    const now = new Date();
    const upcoming = todos.filter((todo) => {
      const dueDate = new Date(todo.due_date);
      return dueDate > now && dueDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    });
    setUpcomingTodos(upcoming);
  }, [todos]);


  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.status === 'completed').length;
  const pendingTodos = todos.filter((todo) => todo.status === 'pending').length;

  return (
    <div className="p-6">
      {/* Özet İstatistikler */}
      <Card title="Özet İstatistikler">
        <div className="text-white text-lg">
          <p>Toplam Todo: {totalTodos}</p>
          <p>Tamamlanan: {completedTodos}</p>
          <p>Bekleyen: {pendingTodos}</p>
        </div>
      </Card>

      {/* Yaklaşan Bitiş Tarihleri */}
      <Card title="Yaklaşan Bitiş Tarihleri">
        {upcomingTodos.length === 0 ? (
          <p className="text-white text-center">Yaklaşan bitiş tarihi olan todo yok.</p>
        ) : (
          <ul className="text-white space-y-2">
            {upcomingTodos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center">
                <span>{todo.title}</span>
                <span className="text-sm text-gray-300">{new Date(todo.due_date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
        <Card title="Hızlı Durum Değiştirme">
        {todos.length === 0 ? (
          <p className="text-white text-center">Todo bulunamadı.</p>
        ) : (
          <ul className="text-white space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span>{todo.title}</span>
                </div>
                    <select
        value={todo.status}
       onChange={(e) => handleStatusChange(todo.id, e.target.value)}
      className={`px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 text-white ${
      todo.status === 'pending'
      ? 'bg-yellow-500 border-yellow-500 focus:ring-yellow-500'
      : todo.status === 'in_progress'
      ? 'bg-blue-500 border-blue-500 focus:ring-blue-500'
      : todo.status === 'completed'
      ? 'bg-green-500 border-green-500 focus:ring-green-500'
      : todo.status === 'cancelled'
      ? 'bg-red-500 border-red-500 focus:ring-red-500'
      : 'bg-gray-700 border-gray-300 focus:ring-gray-300'
  }`}
>
  <option value="pending" className="bg-yellow-500 text-black">Bekliyor</option>
  <option value="in_progress" className="bg-blue-500 text-white">Devam Ediyor</option>
  <option value="completed" className="bg-green-500 text-white">Tamamlandı</option>
  <option value="cancelled" className="bg-red-500 text-white">İptal Edildi</option>
</select>
              </li>
            ))}
          </ul>
        )}
      </Card>
      
    </div>
  );
};

export default Dashboard;