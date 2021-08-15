import React, { useState, useEffect } from 'react'
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
    const [loggedInUser, setLoggedInUser] = useState();
    const [loggedInHost, setLoggedInHost] = useState();

    const handleBecomeHostOnClick = () => {
        
        history.push(
            {
                pathname: '/newhost',
                state: { loggedInUser: loggedInUser }
            });
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

    const createOrSignInGoogleUserIntoDineMine = (name, email, profileImgUrl) => {

        // check if user exists in dinemine db
        axios.get(`${BASE_URL}/users?email=${email}`).then((response) => {

                console.log("Get User by email: " + response?.data);
                const users = response?.data;
                if (users && users.length > 0)
                {
                    console.log("Logged in user exists in dine mine");
                    // logged in user exists
                    setLoggedInUser(users[0]);
                }
                else
                {
                    // new user login, create user
                    let newUser = {
                        "Username": email,
                        "Email": email,
                        "Full name": name,
                        "Address": "",
                        "Phone": ""
                    };

                    axios.post(`${BASE_URL}/users`, newUser).then(
                        (response) => {
                            console.log("Create New User: " + response?.data);
                            const newUserResp = response?.data
                            if (newUserResp)
                            {
                                newUser["User ID"] = newUserResp["user_id"];
                                setLoggedInUser(newUser);
                            }
                        },
                        (error) => {
                            console.log("Create New User: " + error); 
                        }
                    );
                }
            },
            (error) => {
                console.log("Get User by email: " + error);
            }
        );

        // if user exists, check if he is host, if so, navigate to host profile with host id 

        // if not in db, create a user record 

    };

    useEffect(()=> {
        console.log("UseEffects fired on loggedInUser change");

        // if the loggedInUser is undefined or the loggedInHost is defined, there is nothing to do.
        if (!loggedInUser) // || loggedInHost)
        {
            console.log("loggedInUser not exists or loggedInHost already found, skipping");
            return;
        }

        const loggedInUserId = loggedInUser["User ID"];

        // todo: check if logged in user is host, if so, navigate to host profile page
        axios.get(`${BASE_URL}/hosts?user_id=${loggedInUserId}`).then((response) => {

            if(response?.data && response?.data?.length > 0)
            {
                const host = response.data[0];
                setLoggedInHost(host);
                const host_id = host["Host ID"];
                console.log("loggedin host id: " + host_id);
                // navigate to host profile page
                history.push({
                    pathname: "/hostprofile",
                    state: { 
                        hostImageUploadUrl: `${BASE_URL}/images/host/${host_id}/upload`,
                        hostId: host_id,
                        userId: loggedInUserId
                    }
                });
            }
            else
            {
                console.log("No Host profiles matching the logged in user found");

            }
        });

    }, [loggedInUser]);

    const navigateHomeOnUserLogOut = () => {

        setLoggedInHost(undefined);
        setLoggedInUser(undefined);

        history.push({
            pathname: "/",
            state: {
            }
        });
    };

    const renderBecomeHostBanner = () => {
        if (loggedInUser && !loggedInHost)
        {
            return (<div className="becomeHost__interactive" onClick={handleBecomeHostOnClick}>Become a host</div>);
        }

        if(loggedInHost)
        {
            return (<div/>);
        }

        return (<div className="becomeHost__interactive">Sign in to host</div>);
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
                {renderBecomeHostBanner()}
                {/* <LanguageIcon /> */}
                {/* <ExpandMoreIcon >
                  <DropDownMenu/>
                </ExpandMoreIcon> */}
                <GoogleAuth onUserLogIn={createOrSignInGoogleUserIntoDineMine} onUserLogOut={navigateHomeOnUserLogOut} />
            </div>
        </div>
    )
}

export default Header