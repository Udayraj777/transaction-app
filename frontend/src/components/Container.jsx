const Container = ({ children }) => {
  return (
    <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-sm">
      {children}
    </div>
  );
};

export default Container;