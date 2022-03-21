import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();
  const handleToLogin = useCallback(() => {
    navigate('Login');
  }, [navigate]);
  const handleToSignUp = useCallback(() => {
    navigate('SignUp');
  }, [navigate]);

  return { handleToLogin, handleToSignUp };
};

export default useConnect;
