
const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-black'; // Bekliyor
      case 'in_progress':
        return 'bg-blue-500 text-white'; // Devam Ediyor
      case 'completed':
        return 'bg-green-500 text-white'; // Tamamlandı
      case 'cancelled':
        return 'bg-red-500 text-white'; // İptal Edildi
      default:
        return 'bg-gray-500 text-white'; // Varsayılan
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-bold ${getStatusClass(status)}`}
    >
      {status === 'pending' && 'Bekliyor'}
      {status === 'in_progress' && 'Devam Ediyor'}
      {status === 'completed' && 'Tamamlandı'}
      {status === 'cancelled' && 'İptal Edildi'}
    </span>
  );
};

export default StatusBadge;