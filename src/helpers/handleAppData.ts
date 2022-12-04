import { AppData } from '../config/data';
import { AxiosResponse } from 'axios';
import { decodeToken } from './authentication';
import { getUserById } from '../services/users/userService';

const setAppData = (data: Partial<Record<AppData, string>>) => {
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(key, value);
  }
};

const getAppData = (key: AppData) => window.localStorage.getItem(key);

const removeAppData = (key: AppData) => window.localStorage.removeItem(key);

const setReceivedAppData = async (response: AxiosResponse) => {
  const { userId, userLogin, expirationTime } = decodeToken(response.data.token);
  const appData = {
    [AppData.TOKEN]: response.data.token,
    [AppData.USER_ID]: userId,
    [AppData.USER_LOGIN]: userLogin,
    [AppData.EXPIRATION_TIME]: expirationTime,
  };
  setAppData(appData);
  const userCredentials = await getUserById(userId);
  if (!('code' in userCredentials)) setAppData({ [AppData.USER_NAME]: userCredentials.name });

  return appData;
};

export { getAppData, setAppData, removeAppData, setReceivedAppData };
