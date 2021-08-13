import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import Header from './Header';

function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
  
        {open && props.children}
      </li>
    );
}

export default NavItem