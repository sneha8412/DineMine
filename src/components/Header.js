import React, { useState }from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropDownMenu from './DropDownMenu';
import GoogleAuth from "./google/GoogleAuth";
import { useHistory } from "react-router-dom";


function Header(props) {
    
    const history = useHistory();

    const handleBecomeHostOnClick = () => {
        history.push('/newhost');
    }

    const handleDineMineOnClick =() => {
        history.push('/');
    }

    const [open, setOpen] = useState(false);

    
    return (
        <div className='header'>
            <div className="header__icon" onClick={e => handleDineMineOnClick()}>DineMine</div>
           
            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>
                <div className="becomeHost__interactive" onClick={handleBecomeHostOnClick}>Become a host</div>
                {/* <LanguageIcon /> */}
                <ExpandMoreIcon >
                  <DropDownMenu/>
                </ExpandMoreIcon>
               
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header