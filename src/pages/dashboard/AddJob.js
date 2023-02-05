import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/JobSlice';

const AddJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        }),
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
          {/* company */}
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job Location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* status */}
          <FormRowSelect
            labelText='status'
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
            labelText='Job Type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-lock clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='button'
              className='btn btn-lock submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
