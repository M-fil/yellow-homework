import { Urls } from '../constants/urls';

export const submitFeedback = async (text: string, token: string): Promise<'success' | string> => {
  try {
    const response = await fetch(Urls.GetJogs, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topic_id: 1, text }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_message)
    }

    return 'success';
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return error.message;
    }

    return '';
  }
};
