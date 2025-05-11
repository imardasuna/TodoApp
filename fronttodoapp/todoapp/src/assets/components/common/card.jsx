
const Card = ({ children, title }) => {
  return (
    <div className="mt-6 p-4 sm:p-6 max-w-lg mx-auto bg-sky-900 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;