import { getUserFromLocalStorage } from './localStorage';

const authHeader = (thunkApi) => {
  return { headers: { authorization: `Bearer ${getUserFromLocalStorage().token}` } };
};

export default authHeader;
