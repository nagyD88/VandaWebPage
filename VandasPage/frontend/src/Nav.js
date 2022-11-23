import { Link } from 'react-router-dom';
const Nav = () => {

return (
    <nav className="sideNav">
      <div className="navElement active">
        <Link to="/">Home</Link>
      </div>
      <div className="navElement">
        <Link to="register">Regisztráció</Link>
      </div>
      <div className="navElement">
        <Link to="User">Felhasználók</Link>
      </div>
      <div className="navElement">
        <Link to="questionnaire">Kérdőív</Link>
      </div>
      <div className="navElement">
        <Link to="Education">Oktató felület</Link>
      </div>
    </nav>
  );
};

export default Nav;