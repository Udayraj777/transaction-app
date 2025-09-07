import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      // If no token, redirect to signin
      if (!token) {
        navigate('/signin');
        return;
      }

      // If token exists, verify it's valid
      try {
        const response = await axios.get("http://localhost:8081/api/v1/user/me", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          // Valid token, redirect to dashboard
          navigate('/dashboard');
        } else {
          // Invalid response, go to signin
          localStorage.removeItem('token');
          navigate('/signin');
        }
      } catch (error) {
        // Invalid token, clear it and go to signin
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        navigate('/signin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // This should rarely be seen since we redirect
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Redirecting...</div>
    </div>
  );
};

export default Home;