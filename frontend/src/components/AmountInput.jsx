const AmountInput = ({ value, onChange, placeholder = "Enter amount" }) => {
  return (
    <div className="mb-6">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Amount (in $)
      </label>
      
      {/* Input Field */}
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
};

export default AmountInput;