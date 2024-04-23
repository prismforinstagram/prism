import { useRouter, useSegments } from 'expo-router';
import React, {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] === '(auth)';
    removeAuthToken();

    if (!authToken && !isAuthGroup) {
       router.replace('/login');
    }
    if (authToken && isAuthGroup) {
       router.replace('/');
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync('authToken');
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);