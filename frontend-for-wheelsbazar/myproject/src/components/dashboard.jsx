// Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5500/auth/status', {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to the Dashboard!</h2>
        {user && (
          <div>
            <p className="text-center">Hello, {user.displayName}!</p>
            <p className="text-center">Email: {user.emails[0].value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;