import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/JobSlice';
import { logoutUser } from './UserSlice';

export const registerUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: { authorization: `Bearer ${thunkApi.getState().user.user.token}` },
    });
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const clearStoreThunk = async (message, thunkApi) => {
  try {
    // logout user
    thunkApi.dispatch(logoutUser(message));
    //clear job value
    thunkApi.dispatch(clearAllJobsState());
    // clear job input values
    thunkApi.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
