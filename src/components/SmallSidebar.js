import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSidebar } from '../features/user/UserSlice';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((store) => store.user);
  const toogle = () => {
    dispatch(toogleSidebar());
  };
  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' onClick={toogle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
