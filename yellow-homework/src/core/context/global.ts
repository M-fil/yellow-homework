import { createContext, SetStateAction, Dispatch } from 'react';

export interface GlobalContextObject {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextObject>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setIsLoading: () => {},
});
