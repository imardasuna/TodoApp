import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Token'ı kontrol et

  // Eğer token yoksa kullanıcıyı giriş sayfasına yönlendir
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;