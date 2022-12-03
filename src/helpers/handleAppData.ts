import { AppData } from '../config/data';
import { AxiosResponse } from 'axios';
import { decodeToken } from './authentication';
import { getUserById } from '../services/users/userService';
import { UserResponse } from '../services/users/types';

const setAppData = (data: Partial<Record<AppData, string>>) => {
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(key, value);
  }
};

const getAppData = (key: AppData) => window.localStorage.getItem(key);

const removeAppData = (key: AppData) => window.localStorage.removeItem(key);

const getAppDataFromResponse = async (response: AxiosResponse) => {
  const { userId, userLogin, expirationTime } = decodeToken(response.data.token);
  const appData = {
    token: response.data.token,
    userId,
    userLogin,
    expirationTime,
    userName: '',
  };
  const userDetails = await getUserById(userId);
  if (!('code' in userDetails)) appData.userName = (userDetails as UserResponse).name;

  return appData;
};

export { getAppData, setAppData, removeAppData, getAppDataFromResponse };
