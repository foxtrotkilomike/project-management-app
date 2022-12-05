import { removeAppData } from './handleAppData';
import { AppData } from '../config/data';

export default function () {
  const userCredentials = Object.values(AppData);
  userCredentials.map((storageKey) => removeAppData(storageKey));
}
