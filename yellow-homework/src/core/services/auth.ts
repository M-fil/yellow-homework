import { Urls } from '../constants/urls';

type LoginUserOutput = Promise<{ token?: string, error?: string }>;

const LOCAL_STORAGE_TOKEN = 'LOCAL_STORAGE_TOKEN';

export const getSavedToken = (): string => localStorage.getItem(LOCAL_STORAGE_TOKEN) || '';

export const setTokenLocally = (token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};

export const loginUser = async (uuid = 'hello'): LoginUserOutput => {
  try {
    const response = await fetch(Urls.Auth, {
      method: 'POST',
      body: JSON.stringify({ uuid }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data ? data.error_message : '');
    }

    const token = data.response.access_token;
    setTokenLocally(token);

    return { token };
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: '' };
  }
};
