import authHeader from '../../utils/authHeader';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';

export const getAllJobsThunks = async (_, thunkApi) => {
  const { page, search, searchStatus, searchType, sort } = thunkApi.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url, {
      headers: { authorization: `Bearer ${getUserFromLocalStorage().token}` },
    });
    //console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const showStatusThunks = async (_, thunkApi) => {
  try {
    const resp = await customFetch.get('/jobs/stats', authHeader(thunkApi));
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
