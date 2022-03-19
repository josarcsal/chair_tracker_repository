import { useUsuarios } from 'axios/hooks/useUsuarios';

const useConnect = () => {
  const { normalizedData } = useUsuarios();

  return { normalizedData };
};

export default useConnect;
