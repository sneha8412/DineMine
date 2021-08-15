import React, { useEffect, useState } from 'react';
import { loadGoogleScript } from './GoogleLogin';
// import logo from './logo.svg';
import GoogleLogin from './GoogleLogin';
import { Avatar } from "@material-ui/core";
import "./GoogleAuth.css";

function GoogleAuth(){
    // See: https://console.cloud.google.com/apis/credentials?project=aidacapstone1
    const googleClientId = "153608278319-169t8o4mqbd6lpjhkuqh2lv2n8f2md5r.apps.googleusercontent.com" //process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();

    const [newHostFormDisplay, setNewHostFormDisplay] = useState(true)

    const onSuccess = (googleUser) => {
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
    };

    const createOrSignInGoogleUserInDineMine = () => {

        // check if user exists in dinemine db
        // if not in db, create a user record 

    };

    const onFailure = () => {
        setIsLoggedIn(false);
    }

    const logOut = () => {
        (async() => {
        await googleAuth.signOut();
        setIsLoggedIn(false);
        renderSigninButton(gapi);
    })();
    };

    const renderSigninButton = (_gapi) => {
        _gapi.signin2.render('google-signin', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure 
    });
    }


    useEffect(() => {

    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
        
        const _gapi = window.gapi;
        setGapi(_gapi);
        
        _gapi.load('auth2', () => {
        (async () => { 
            const _googleAuth = await _gapi.auth2.init({
            client_id: googleClientId
            });
            setGoogleAuth(_googleAuth);
            renderSigninButton(_gapi);
        })();
        });
    }
    loadGoogleScript();
        
    });

    return (
        <div>
        {!isLoggedIn && <div id="google-signin"></div>
        }
        
        {isLoggedIn &&
          <div className="signed-in-userinfo">
            {/* <div>
              <img src={imageUrl} alt="google sign-in"/>
            </div>
            <div>{name}</div>
            <div>{email}</div> */}
            <Avatar alt={name} src={imageUrl} />
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }
      </div>

    )

};

export default GoogleAuth