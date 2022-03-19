import './Navbar.css';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink } from "react-router-dom";
import logo from '../../logo/netflix_acc.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Navbar() {
  const [scroll, setScroll] = useState(false);


  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener('scroll')
    }
  }, [])


  return (
    <motion.div className={`${scroll ? "navbar_black" : "navbar"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <ul className="navbar-left">
        <li style={{ lineHeight: 0 }}><Link to="/home"><img className="navbar-logo" src="https://fontmeme.com/permalink/220212/2b79b3189fcc6673d3153dee728478eb.png" alt="netflix-font" border="0" /></Link></li>
        <li className="navbar-link "><NavLink to="/home" className={(navData) => navData.isActive ? "active" : "nav-child"}>Home</NavLink></li>
        <li className="navbar-link " ><NavLink to="/tvshows" className={(navData) => navData.isActive ? "active" : "nav-child"} >TV Shows</NavLink></li>
        <li className="navbar-link"><NavLink to="/movies" className={(navData) => navData.isActive ? "active" : "nav-child"}>Movies</NavLink></li>
      </ul>

      <div className="navbar-res">
        Browse
        <ArrowDropDownIcon />
      </div>

      <div className="navbar-right">
        <SearchIcon sx={{ marginRight: '1.3vw', fontSize: '2vw', cursor: 'pointer' }} />
        <NotificationsIcon sx={{ marginRight: '1.3vw', fontSize: '2vw', cursor: 'pointer' }} />
        <Link to="/home"><img className="navbar-acc" src={logo} alt="account_logo" border="0" /></Link>
        <ArrowDropDownIcon sx={{ cursor: 'pointer' }} />
      </div>
    </motion.div>


  )
}

export default Navbar