import { configureStore } from '@reduxjs/toolkit';
import allJobsSlice from './features/allJobs/allJobsSlice';
import jobSlice from './features/job/JobSlice';
import userSlice from './features/user/UserSlice';

export const store = configureStore({
  reducer: { user: userSlice, job: jobSlice, allJobs: allJobsSlice },
});
