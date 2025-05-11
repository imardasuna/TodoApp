import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import Card from '../components/common/card';

const TodoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const todo = location.state?.todo || null;
  const { addTodo, updateTodo } = useTodos();

  const formik = useFormik({
    initialValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      status: todo?.status || 'pending',
      priority: todo?.priority || 'medium',
      due_date: todo?.due_date || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Başlık zorunludur'),
      description: Yup.string().required('Açıklama zorunludur'),
      status: Yup.string().required('Durum seçilmelidir'),
      priority: Yup.string().required('Öncelik seçilmelidir'),
      due_date: Yup.date()
        .required('Son tarih zorunludur')
        .nullable()
        .min(new Date(), 'Gelecek bir tarih seçin'),
    }),
    onSubmit: async (values) => {
      try {
        if (todo) {
          await updateTodo(todo.id, values);
        } else {
          await addTodo(values);
        }
        navigate('/todos');
      } catch (error) {
        console.error('Hata:', error);
      }
    },
  });

  return (
    <Card title={todo ? 'Todo Düzenle' : 'Yeni Todo Ekle'}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Başlık */}
        <FormField
          label="Başlık"
          name="title"
          type="text"
          placeholder="Başlık"
          formik={formik}
        />

        {/* Son Tarih */}
        <FormField
          label="Son Tarih"
          name="due_date"
          type="date"
          formik={formik}
        />

        {/* Açıklama */}
        <FormField
          label="Açıklama"
          name="description"
          type="textarea"
          placeholder="Açıklama"
          rows="4"
          formik={formik}
        />

        {/* Durum */}
        <FormSelect
          label="Durum"
          name="status"
          options={[
            { value: 'pending', label: 'Bekliyor' },
            { value: 'in_progress', label: 'Devam Ediyor' },
            { value: 'completed', label: 'Tamamlandı' },
            { value: 'cancelled', label: 'İptal Edildi' },
          ]}
          formik={formik}
        />

        {/* Öncelik */}
        <FormSelect
          label="Öncelik"
          name="priority"
          options={[
            { value: 'low', label: 'Düşük' },
            { value: 'medium', label: 'Orta' },
            { value: 'high', label: 'Yüksek' },
          ]}
          formik={formik}
        />

        {/* Gönder Butonu */}
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {todo ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
    </Card>
  );
};

const FormField = ({ label, name, type, placeholder, rows, formik }) => (
  <div>
    <label className="block text-lg font-medium text-white mb-2">{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
          formik.touched[name] && formik.errors[name]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-400'
        }`}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
          formik.touched[name] && formik.errors[name]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-indigo-400'
        }`}
        placeholder={placeholder}
      />
    )}
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

const FormSelect = ({ label, name, options, formik }) => (
  <div>
    <label className="block text-lg font-medium text-white mb-2">{label}</label>
    <select
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
        formik.touched[name] && formik.errors[name]
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-indigo-400'
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

export default TodoForm;