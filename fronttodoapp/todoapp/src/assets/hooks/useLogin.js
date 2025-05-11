import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
  try {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Hatası:', errorData);
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await res.json();
    console.log('API Yanıtı:', data);

    localStorage.setItem('user_id', data.user.id);
    localStorage.setItem('token', data.token);
    console.log(localStorage.getItem('user_id')); // Kullanıcının id'sini döndürmeli
    console.log(localStorage.getItem('token')); // Token'ı döndürmeli
    dispatch(
      loginSuccess({
        token: data.token,
        user: data.user,
      })
    );

    return data; // Bu return ifadesi bir fonksiyonun içinde olmalı
  } catch (err) {
    console.error('Fetch Hatası:', err.message);
    setError(err.message);
    throw err;
  }
};

  return { login, loading, error };
}
