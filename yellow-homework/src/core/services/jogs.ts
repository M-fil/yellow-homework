import { Urls } from '../constants/urls';
import { convertDateInSecondsNumber } from '../utils/date';
export interface JogEntity {
  date: number,
  distance: number,
  id: number,
  time: number,
  user_id: string,
}

export interface JogRequestBody {
  date: string,
  distance: number,
  time: number,
}

export interface FilterValues {
  isOpened: boolean,
  fromDate: string,
  toDate: string,
}

type GetAllJogsOutput = Promise<{ jogs?: JogEntity[], error?: string }>
type CreateNewJogOutput = Promise<{ jog?: JogEntity, error?: string }>

const LOCAL_STORAGE_FILTER_VALUES = 'LOCAL_STORAGE_FILTER_VALUES';

export const setFilterValues = (filterValues: FilterValues): void => {
  window.localStorage.setItem(LOCAL_STORAGE_FILTER_VALUES, JSON.stringify(filterValues));
};

export const getFilterValues = (): FilterValues | undefined => {
  const localStorageDate = window.localStorage.getItem(LOCAL_STORAGE_FILTER_VALUES);

  return localStorageDate && JSON.parse(localStorageDate);
}

export const getAllJogs = async (token: string): GetAllJogsOutput => {
  try {
    const response = await fetch(Urls.GetJogs, {
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

    return { error: '' };
  }
};

export const createNewJog = async (token: string, jog: JogRequestBody): CreateNewJogOutput => {
  try {
    const response = await fetch(Urls.CreateJogs, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jog),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_message);
    }
    const { distance, id, time, date, user_id } = data.response;
    const createdJog: JogEntity = {
      date: convertDateInSecondsNumber(date),
      distance,
      id,
      time,
      user_id,
    };

    return { jog: createdJog };
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: '' };
  }
}
