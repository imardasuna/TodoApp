import React, { useState, useEffect } from 'react';
import useTodos from '../hooks/useTodos';
import { Link } from 'react-router-dom';
import TodoFilter from '../components/todo/TodoFilter';
import Modal from '../components/common/Modal';

const TodoList = () => {
  const { todos, fetchTodos, deleteTodo, loading, error, handleStatusChange } = useTodos();
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos(); // Sayfa yüklendiğinde todo'ları getir
  }, []);

  const handleDeleteClick = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTodo) {
      await deleteTodo(selectedTodo.id); // Todo'yu sil
      setIsModalOpen(false);
      setSelectedTodo(null);
      fetchTodos(); // Listeyi yenile
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      filters.search === '' ||
      todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      todo.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = filters.status === '' || todo.status === filters.status;
    const matchesPriority = filters.priority === '' || todo.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center text-white">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Hata: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Todo Listesi</h1>

      {/* Filtreleme Bileşeni */}
      <TodoFilter filters={filters} setFilters={setFilters} />

      {filteredTodos.length === 0 ? (
        <div className="text-center text-white mt-6">Filtreye uygun bir todo bulunamadı.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${getStatusClasses(
                todo.status
              )}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{todo.title}</h2>
                <span className="text-sm font-medium capitalize">{todo.status.replace('_', ' ')}</span>
              </div>
              <p className="mb-4">{todo.description}</p>
              <div className="flex justify-between items-center">
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                  className={`px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 ${
                    todo.status === 'pending'
                      ? 'bg-yellow-500 text-black border-yellow-500 focus:ring-yellow-500'
                      : todo.status === 'in_progress'
                      ? 'bg-blue-500 text-white border-blue-500 focus:ring-blue-500'
                      : todo.status === 'completed'
                      ? 'bg-green-500 text-white border-green-500 focus:ring-green-500'
                      : todo.status === 'cancelled'
                      ? 'bg-red-500 text-white border-red-500 focus:ring-red-500'
                      : 'bg-gray-500 text-white border-gray-500 focus:ring-gray-500'
                  }`}
                >
                  <option value="pending" className="bg-yellow-500 text-black">Bekliyor</option>
                  <option value="in_progress" className="bg-blue-500 text-white">Devam Ediyor</option>
                  <option value="completed" className="bg-green-500 text-white">Tamamlandı</option>
                  <option value="cancelled" className="bg-red-500 text-white">İptal Edildi</option>
                </select>
                <div className="flex space-x-2">
                  <Link
                    to={`/todo`}
                    state={{ todo }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Detaylar
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(todo)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Todo Sil"
        message={`"${selectedTodo?.title}" başlıklı todo'yu silmek istediğinize emin misiniz?`}
      />
    </div>
  );
};

export default TodoList;