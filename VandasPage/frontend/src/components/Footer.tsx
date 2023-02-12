import React from 'react'
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className='absolute bottom-1 left-[calc(50%-80px)]'>
      <p>&copy;Copyright {currentYear}</p>
    </footer>
  )
}

export default Footer