import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/dataContext";
import AuthContext from "../context/AuthProvider";

const Nav = () => {
  const { colorTheme } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className={`navElement ${colorTheme}`}>
          <Link to="/">Home</Link>
        </li>
        {/* {auth.roles && <> */}
        <li className={`navElement ${colorTheme}`}>
          <Link to="preregister">Előregisztráció</Link>
        </li>
        <li className={`navElement ${colorTheme}`}>
          <Link to="register">Regisztráció</Link>
        </li>
        <li className={`navElement ${colorTheme}`}>
          <Link to="User">Felhasználók</Link>
        </li>
        {/* </>} */}

        <li className={`navElement ${colorTheme}`}>
          <Link to="questionnaire">Kérdőív</Link>
        </li>
        <li className={`navElement ${colorTheme}`}>
          <Link to="Education">Oktató felület</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
