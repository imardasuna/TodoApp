import { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import DOMPurify from 'dompurify';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tüm Todo'ları API'den al
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get('/todos');
      setTodos(response.data.todos); // API'den gelen veriyi todos array'ine aktar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  const addTodo = async (todoData) => {
    setLoading(true);
    try {
        const sanitizedData = {
            ...todoData,
            title: DOMPurify.sanitize(todoData.title),
            description: DOMPurify.sanitize(todoData.description),
          };
          console.log('Gönderilen Veriler:', sanitizedData);
      const response = await axiosClient.post('/todos', sanitizedData);
      console.log('Backend Yanıtı:', response.data); 
      fetchTodos();

      return response.data;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Silme işlemi
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axiosClient.delete(`/todos/${id}`);
      fetchTodos(); // Silme sonrası verileri yenile
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    const updateTodo = async (id, updatedData) => {
  try {
    await axiosClient.put(`/todos/${id}`, updatedData);
  } catch (err) {
    console.error('Todo güncellenirken hata oluştu:', err.message);
  }
    };

      const handleStatusChange = async (id, newStatus) => {
  try {
    // Backend'e POST isteği gönder
    await axiosClient.post(`/todos/${id}/status`, { status: newStatus });
    fetchTodos(); // Güncellemeden sonra todo listesini yenile
  } catch (err) {
    console.error('Durum güncellenirken hata oluştu:', err.message);
  }
};

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, addTodo, deleteTodo, fetchTodos,updateTodo,handleStatusChange};
};

export default useTodos;
