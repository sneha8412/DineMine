import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
//import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import GoogleAuth from "./google/GoogleAuth";
import { useHistory } from "react-router-dom";
import NewHostForm from './NewHostForm';

function Header() {
    
    const history = useHistory();

    const handleBecomeHostOnClick = () => {
        history.push('/newhost');
    }

    const handleDineMineOnClick =() => {
        history.push('/');
    }

    
    return (
        <div className='header'>
            <div className="header__icon"onClick={e => handleDineMineOnClick()}>DineMine</div>
           
            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>
                <div className="becomeHost__interactive" onClick={e => handleBecomeHostOnClick()}>Become a host</div>
                {/* <LanguageIcon /> */}
                <ExpandMoreIcon />
                {/* <Avatar /> */}
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header