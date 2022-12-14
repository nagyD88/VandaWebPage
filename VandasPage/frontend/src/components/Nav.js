import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/dataContext';
import AuthContext from '../context/AuthProvider';

const Nav = () => {
  const { colorTheme } = useContext(DataContext);
  const {auth} = useContext(AuthContext)
return (
    <nav className={`sideNav ${colorTheme}`} >
      <div className={`navElement ${colorTheme}`}>
        <Link to="/">Home</Link>
      </div>
      {auth.roles && <>
      <div className={`navElement ${colorTheme}`}>
        <Link to="preregister">Előregisztráció</Link>
      </div>
      <div className={`navElement ${colorTheme}`}>
        <Link to="register">Regisztráció</Link>
      </div>
      <div className={`navElement ${colorTheme}`}>
        <Link to="User">Felhasználók</Link>
      </div>
      </>}

      <div className={`navElement ${colorTheme}`}>
        <Link to="questionnaire">Kérdőív</Link>
      </div>
      <div className={`navElement ${colorTheme}`}>
        <Link to="Education">Oktató felület</Link>
      </div>
    </nav>
  );
};

export default Nav;