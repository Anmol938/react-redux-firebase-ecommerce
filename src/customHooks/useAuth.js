import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // Use the navigate function to redirect to the login route
      navigate('/login');
    }

  }, [currentUser, navigate]);

  return currentUser;
};

export default useAuth;
