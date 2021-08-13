import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import NavItem from './NavItem';

function NavBar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }

export default NavBar