import React from 'react';
import { useNavigate } from 'react-router-dom';

const TooManyRequests = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/login'); // Kullanıcıyı ana sayfaya yönlendirme
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">429 - Çok Fazla İstek</h1>
      <p className="text-lg text-gray-300 mb-6">
        Çok fazla istek gönderdiniz. Lütfen biraz bekleyip tekrar deneyin.
      </p>
      
    </div>
  );
};

export default TooManyRequests;