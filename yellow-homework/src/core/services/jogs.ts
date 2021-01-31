import { Urls } from '../constants/urls';

export interface JogEntity {
  date: number,
  distance: number,
  id: number
  time: number
  user_id: string
}

type GetAllJogsOutput = Promise<{ jogs: JogEntity[] } | { error: string }>

export const getAllJogs = async (token: string) => {
  try {
    const response = await fetch(Urls.Jogs, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_message);
    }
    const jogs = data.response.jogs;

    return { jogs };
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};
