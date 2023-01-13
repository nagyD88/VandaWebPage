// import './App.css';
import { useContext, useState } from 'react';
import DataContext from '../context/dataContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Header = () => {
  const { colorTheme, setColorTheme } = useContext(DataContext);
  const [isDarkMode, setDarkMode] = useState(false);


  const clickHandler = () => {
    if (colorTheme === 'Dark') {
      setColorTheme('Light');
    } else {
      setColorTheme('Dark');
    }
  };
  

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div className={`header ${colorTheme}`}>
      <div className="logo">
        <div className="name">
        
        </div>
        <div className="name Space">Vanda</div>
      </div>

      <div className={`log ${colorTheme}`}>
        <div className="darkMode" onClick={() => clickHandler()}>
          {' '}
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;