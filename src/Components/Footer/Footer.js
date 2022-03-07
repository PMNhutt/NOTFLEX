import {memo} from 'react'
import './Footer.css'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {

  const links = ['Audio and Subtiles', 'Audio Description', 'Help Center',
    'Gift Cards', 'Media Center', 'Investor Relations', 'Jobs',
    'Terms of Use', 'Privacy', 'Legal Notices', 'Cookie Preferences',
    'Corporate Information', 'Contact Us'];

  return (
    <div className="footer-container">
      <div className="footer-socialLink">
        <FacebookRoundedIcon sx={{marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw'}}/>
        <InstagramIcon sx={{marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw'}}/>
        <TwitterIcon sx={{marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw'}}/>
        <YouTubeIcon sx={{marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw'}}/>
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
            @2022 Netflix clone by NhutPM
      </div>
    </div>
  )
}

export default memo(Footer)