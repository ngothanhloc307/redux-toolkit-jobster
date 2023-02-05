import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ toogleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={toogleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
