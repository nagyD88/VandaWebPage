import Header from './Header';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './dataContext/dataContext';

const Layout = () => {

    const {colorTheme} = useContext(DataContext);
    return (
        <div className={`App ${colorTheme}`}>
            <Header title="nasaApi"/>
            <Nav/>
            <div className='mainPart'><Outlet /></div>
        </div>
    )
}

export default Layout