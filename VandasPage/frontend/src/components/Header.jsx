import React from 'react'
import Nav from './Nav'

const Header = () => {
  return (
    <div className='header-container'>
        <Nav />
        <ul className='course-list'>
          <li>
            First course
          </li>
          <li>
            Second course
          </li>
          <li>
            Third course
          </li>
          <li>
            Fourth course
          </li>
        </ul>
        <button className='btn'>New course</button>
        <button className='btn'>New lesson</button>
    </div>
  )
}

export default Header