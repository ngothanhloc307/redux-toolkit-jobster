import axios from 'axios';
import { clearStore } from '../features/user/UserSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers.common['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const checkForUnauthorizedResponse = (error, thunkApi) => {
  if (error.response.status === 401) {
    thunkApi.dispatch(clearStore());
    thunkApi.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkApi.rejectWithValue(error.response.data.msg);
};
export default customFetch;
