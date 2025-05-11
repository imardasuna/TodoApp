import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLogin from '../hooks/useLogin';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success('Giriş başarılı!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      <div className="bg-gradient-to-b from-sky-900 to-sky-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
           Giriş Yap
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="astronot@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>

          {/* Register Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">Hesabınız yok mu? </span>
            <a href="/register" className="text-sky-400 font-semibold hover:underline">
              Kayıt ol
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;