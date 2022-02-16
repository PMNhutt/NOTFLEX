import React, { useEffect, useState } from 'react';
import logo from '../logo/netflix_acc.png';
import '../Component CSS/Navbar.css';
import { Link, NavLink } from "react-router-dom";

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
    <div className={`${scroll ? "navbar_black" : "navbar"}`}>
      <Link to="/"><img className="navbar-logo" src="https://fontmeme.com/permalink/220212/2b79b3189fcc6673d3153dee728478eb.png" alt="netflix-font" border="0" /></Link>

      <ul className="navbar-links">
        <li className="navbar-link "><NavLink to="/"  className={(navData) => navData.isActive ? "active" : "nav-child" }>Home</NavLink></li>
        <li className="navbar-link " ><NavLink to="/tvshows" className={(navData) => navData.isActive ? "active" : "nav-child" } >TV Shows</NavLink></li>
        <li className="navbar-link"><NavLink to="/movies"  className={(navData) => navData.isActive ? "active" : "nav-child" }>Movies</NavLink></li>
      </ul>

      <Link to="/"><img className="navbar-acc" src={logo} alt="account_logo" border="0" /></Link>
    </div>


  )
}

export default Navbar