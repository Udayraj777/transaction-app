const FriendInfo = ({ name, initial }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Avatar Circle */}
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-lg">
          {initial}
        </span>
      </div>
      
      {/* Friend's Name */}
      <span className="text-xl font-semibold text-gray-900">
        {name}
      </span>
    </div>
  );
};

export default FriendInfo;