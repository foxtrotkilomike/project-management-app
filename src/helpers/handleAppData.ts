import { AppData } from '../config/types';

const setAppData = (data: AppData) => {
  for (const [key, value] of Object.entries(data)) {
    window.localStorage.setItem(key, value);
  }
};

const getAppData = (key: keyof AppData) => window.localStorage.getItem(key);

const removeAppData = (key: keyof AppData) => window.localStorage.removeItem(key);

export { getAppData, setAppData, removeAppData };
