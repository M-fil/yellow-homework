import { EnvConfig } from '../constants/env-config';
import { Urls } from '../constants/urls';

type LoginUserOutput = Promise<{ token: string } | { error: string }>

export const loginUser = async (uuid: 'hello'): LoginUserOutput => {
  try {
    const response = await fetch(Urls.Auth, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${EnvConfig.BACKEND_KEY}`,
      },
      body: JSON.stringify({ uuid }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data ? data.error_message : '');
    }

    return { token: data.response.access_token };
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};
