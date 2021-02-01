import { createContext, SetStateAction, Dispatch } from 'react';

export interface GlobalContextObject {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFilterValues: Dispatch<SetStateAction<{ from: string, to: string }>>;
  filterValues: { from: string, to: string };
}

export const GlobalContext = createContext<GlobalContextObject>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  setIsLoading: () => { },
  setFilterValues: () => { },
  filterValues: { from: '', to: '' },
});
