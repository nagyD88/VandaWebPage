import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const {auth} = useContext(AuthContext)
    
    let activeStyle = {
    backgroundColor: "gray"
  };

  return (
    <nav>
        <ul>
            {}
        </ul>
    </nav>
  )
}

export default Sidebar