import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Ana Sayfa</h1>
      <div className="space-x-4">
        <Link to="/register" className="text-blue-600 hover:underline">
          Kayıt Ol
        </Link>
        <Link to="/login" className="text-green-600 hover:underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}

export default Home;
