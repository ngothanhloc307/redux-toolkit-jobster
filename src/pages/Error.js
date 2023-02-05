import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={notfound} alt='notfound' />
        <h3>oh!page is not found</h3>
        <p>we can't seem to find the page you're looking for </p>
        <Link to='/' className='btn btn-hero'>
          back home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
