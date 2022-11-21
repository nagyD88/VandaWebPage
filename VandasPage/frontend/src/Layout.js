import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Header from './Header';


const Layout = () => {

   
    return (
        <div className={`App`}>
            <Header/>
            <Nav/>
            <div className='mainPart'><Outlet /></div>
        </div>
    )
}

export default Layout