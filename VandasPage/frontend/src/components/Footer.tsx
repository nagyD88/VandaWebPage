import React from 'react'
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <footer>
      <p>&copy;Copyright {currentYear}</p>
    </footer>
  )
}

export default Footer