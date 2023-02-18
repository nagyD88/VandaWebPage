import React from 'react'
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className='relative bottom-1 pt-10 pb-10 inset-x-auto'>
      <p>&copy;Copyright {currentYear}</p>
    </footer>
  )
}

export default Footer