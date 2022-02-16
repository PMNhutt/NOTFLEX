import React from 'react'
import '../Component CSS/Footer.css'

function Footer() {

  const links = ['Audio and Subtiles', 'Audio Description', 'Help Center',
    'Gift Cards', 'Media Center', 'Investor Relations', 'Jobs',
    'Terms of Use', 'Privacy', 'Legal Notices', 'Cookie Preferences',
    'Corporate Information', 'Contact Us'];

  return (
    <div className="footer-container">
      <div className="footer-socialLink">
        <i className="fab fa-facebook-f link"></i>
        <i className="fab fa-instagram link"></i>
        <i className="fab fa-twitter link"></i>
        <i className="fab fa-youtube link"></i>
      </div>

      <div className="footer-content">
        <ul className="content-members">
          {links.map(link => (
            <li
              key={link}
              className="member"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-copyRight">
            @2022 Notflex by NhutPM
      </div>
    </div>
  )
}

export default Footer