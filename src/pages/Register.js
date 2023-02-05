import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { Logo, FormRow } from '../components';
import { registerUser, loginUser } from '../features/user/UserSlice';
import { useNavigate } from 'react-router-dom';

const initialState = { name: '', email: '', password: '', isMember: true };

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      console.log('please fill out all feidls');
      toast.error('please fill out all feidl');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name: name, email: email, password: password }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} :${value} `);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Log In' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
        )}

        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' onClick={onSubmit} disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button
          type='submit'
          className='btn btn-block btn-hipster'
          onClick={() => dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}
          disabled={isLoading}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>
        <p>
          {values.isMember ? 'Not A Member Yet?' : 'Already a memeber?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
