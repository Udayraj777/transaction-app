import { useState, useEffect } from "react";
import axios from 'axios';
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8081/api/v1/user/me", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const { firstName, lastName } = response.data.user;
          setUser(`${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser("");
    setIsLoading(false);
    navigate('/signup');
  };

  return (
    <header className="flex justify-between items-center p-6 bg-white">
      {/* App Title */}
      <h1 className="text-2xl font-bold text-gray-900">
        Paytm app
      </h1>
             
      {/* User Section */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700">
          Hello, {isLoading ? "Loading..." : user || "User"}
        </span>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium">
            {user ? user.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <div>
          <Button  label='log Out' onClick={handleLogout}/>
        </div>
        
      </div>
      
    </header>
  );
};

export default Header;