import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout = () => {

   
    return (
        <div className={`App`}>
            <Header/>
            <Nav/>
            <div className='mainPart'><Outlet /></div>
            <Footer/>
        </div>
    )
}

export default Layout