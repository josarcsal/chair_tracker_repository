import { useUsuarios } from 'axios/hooks/Users/useUsuarios';

const useConnect = () => {
  const { normalizedData } = useUsuarios();

  return { normalizedData };
};

export default useConnect;
