import { useContactsUsuario } from 'axios/hooks/Users/useContactsUsuario';

const useConnect = () => {
  const { normalizedData } = useContactsUsuario();

  return { normalizedData };
};

export default useConnect;
