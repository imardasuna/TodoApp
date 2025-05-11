import React from 'react';

const TodoFilter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white mb-4">Filtreler</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Arama Kutusu */}
        <input
          type="text"
          name="search"
          value={filters.search || ''}
          onChange={handleFilterChange}
          placeholder="Başlık veya açıklama ara..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Durum Filtresi */}
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="in_progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">İptal Edildi</option>
        </select>

        {/* Öncelik Filtresi */}
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Tüm Öncelikler</option>
          <option value="low">Düşük</option>
          <option value="medium">Orta</option>
          <option value="high">Yüksek</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilter;