import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Geçerli bir e-posta girin').required('E-posta zorunludur'),
      password: Yup.string().min(6, 'En az 6 karakter olmalı').required('Şifre zorunludur'),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifreler uyuşmuyor')
        .required('Şifre tekrar zorunludur'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success('Kayıt başarılı!');
          console.log('API cevabı:', data);
          // Örneğin yönlendirme:
          // navigate('/login');
        } else {
          toast.error(data.message || 'Kayıt başarısız.');
          console.log('API cevabı:', data);
        }
      } catch (error) {
        console.error('İstek hatası:', error);
        toast.error('Sunucuya bağlanılamadı.');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      <div className="bg-gradient-to-b from-sky-900 to-sky-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
           Kayıt ol
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="astronot@example.com"
              required
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Şifre */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Şifre Tekrar */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre Tekrar</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmpassword"
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200"
            >
              {showConfirm ? '🙈' : '👁️'}
            </button>
            {formik.errors.confirmpassword && formik.touched.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmpassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Kayıt Ol
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">Zaten hesabınız var mı? </span>
            <a href="/login" className="text-sky-400 font-semibold hover:underline">
              Giriş yap
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;