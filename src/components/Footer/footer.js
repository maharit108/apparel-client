import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = ({ user }) => {
  return (
    <div className='footer'>
      <p>The content of this site is copyright-protected and is the property of Apparels.We are determined to give you the best apparels in the world</p>
      <h3>Apparels</h3>
      <h4>Copyright © 2020 by Apparels, Inc | <Link to={'/admin-sign-in'}>
        <span>{user ? '' : 'Admin'}</span>
      </Link></h4>
    </div>
  )
}

export default Footer
