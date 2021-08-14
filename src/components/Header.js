import React, { useState }from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropDownMenu from './DropDownMenu';
import GoogleAuth from "./google/GoogleAuth";
import { useHistory } from "react-router-dom";
import config from '../config.json';
import axios from "axios";

function Header(props) {
    
    const BASE_URL = config.SERVER_URL;

    const history = useHistory();

    const handleBecomeHostOnClick = () => {
        history.push('/newhost');
    }

    const handleDineMineOnClick =() => {
        history.push('/');
    }

    const [open, setOpen] = useState(false);
    const [citySearch, setCitySearch] = React.useState('');

    const handleSearchLocationOnClick=() => {

        let searchUrlValue = `${BASE_URL}/experiences`;
        
        if (citySearch !== "")
        {
            searchUrlValue = `${BASE_URL}/experiences?city=${citySearch}`;
        }

        history.push(
            {
            pathname: '/search',
            state: 
                {
                    searchUrl: searchUrlValue
                }
            });
    };

    const handleOnSearchChange = (e) => {
        
        setCitySearch(e.target.value);
    }

    return (
        <div className='header'>
            <div className="header__icon" onClick={e => handleDineMineOnClick()}>DineMine</div>
           
            <div className='header__center'>
                <input
                type="search" 
                placeholder="Search locations" 
                aria-label="Search based on Locations" 
                size="25"
                onChange={handleOnSearchChange}    
                 />
                <SearchIcon onClick={handleSearchLocationOnClick}/>
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