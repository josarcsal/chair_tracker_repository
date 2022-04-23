import { useARegistroAlarmaByUserID } from 'axios/hooks/Stats/useRegistroAlarmasByUserID';

const useConnect = () => {
  const { normalizedData } = useARegistroAlarmaByUserID(2022);

  return { normalizedData };
};

export default useConnect;
