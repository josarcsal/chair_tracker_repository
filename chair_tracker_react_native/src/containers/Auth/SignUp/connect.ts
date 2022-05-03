import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { usePostUsuarios } from 'axios/hooks/Users/usePostUsuarios';
import type { Usuario } from 'axios/types/usuario';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const [newUser, setNewUser] = useState<Usuario>();

  // const normalizedDateTime = (time: Date) =>
  //   time
  //     .toISOString()
  //     .substring(0, new Date().toISOString().length - 2)
  //     .replace('.', ':');

  usePostUsuarios(
    newUser?.hash_mac || '',
    newUser?.nif || '',
    newUser?.contrasena || '',
    null,
    newUser?.nombre || '',
    newUser?.apellidos || '',
    (newUser?.nif_jefe ? 'E' : 'J') || '',
    newUser?.nif_jefe || null,
  );

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  return { handleGoBack, setNewUser, newUser };
};

export default useConnect;
