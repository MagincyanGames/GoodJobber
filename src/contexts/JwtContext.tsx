import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../hooks/Api';

const JWT_STORAGE_KEY = '@jwt_token';

export interface JWTContextType {
  jwt: string | undefined;
  setJwt: (token: string | undefined) => Promise<void>;
  clearJwt: () => Promise<void>;
  isLoading: boolean;
  user: any;
}

const JwtContext = createContext<JWTContextType | undefined>(undefined);

export interface JwtProviderProps {
  children: ReactNode;
}

export function JwtProvider({ children }: JwtProviderProps) {
  const [jwt, _setJwt] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<any | undefined>({});
  const [isLoading, setIsLoading] = useState(true);

  // Cargar JWT del almacenamiento al iniciar
  useEffect(() => {
    loadJWT();
  }, []);

  useEffect(() => {
    if (jwt) loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  async function loadUser() {
    const res = await api('/auth/me', { JWT: jwt });
    const json = await res.json();
    setUser(json.user);

    console.log(json);
  }

  async function loadJWT() {
    try {
      const storedJwt = await AsyncStorage.getItem(JWT_STORAGE_KEY);
      if (storedJwt !== null) {
        _setJwt(storedJwt);
      }
    } catch (error) {
      console.error('Error loading JWT:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function setJwt(token: string | undefined) {
    try {
      if (token) {
        await AsyncStorage.setItem(JWT_STORAGE_KEY, token);
        _setJwt(token);
      } else {
        await AsyncStorage.removeItem(JWT_STORAGE_KEY);
        _setJwt(undefined);
        await setUser(undefined);
      }
    } catch (error) {
      console.error('Error saving JWT:', error);
      throw error;
    }
  }

  async function clearJwt() {
    await setJwt(undefined);
    await setUser(undefined);
  }

  const value: JWTContextType = {
    jwt,
    setJwt,
    clearJwt,
    isLoading,
    user,
  };

  return <JwtContext.Provider value={value}>{children}</JwtContext.Provider>;
}

export function useJwt(): JWTContextType {
  const context = useContext(JwtContext);
  if (context === undefined) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
}
