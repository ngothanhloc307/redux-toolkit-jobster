import Wrapper from '../assets/wrappers/Navbar';
import { FaUserCircle, FaCaretDown, FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { clearStore, toogleSidebar } from '../features/user/UserSlice';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toogle = () => {
    dispatch(toogleSidebar());
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toogle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => {
                dispatch(clearStore('Logout Successfully...'));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
