// Reference: https://www.quod.ai/post/how-to-integrate-google-api-into-your-react-app
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { loadGoogleScript } from './components/GoogleLogin';
import SimpleMap from './components/SimpleMap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//Pages
import HomePage from "./pages"; ///< index.jsx will be automatically imported 
import SearchResultsPage from './pages/SearchResults';
import ExperiencePage from './pages/Experience';

const googleClientId = "153608278319-169t8o4mqbd6lpjhkuqh2lv2n8f2md5r.apps.googleusercontent.com" //process.env.REACT_APP_GOOGLE_CLIENT_ID;

// See: https://console.cloud.google.com/apis/credentials?project=aidacapstone1

function App() {
  
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  
  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
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
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    
  });
  
  
  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn &&
          <div id="google-signin"></div>
        }
        
        {isLoggedIn &&
          <div className="signed-in-userinfo">
            <div>
              <img src={imageUrl} alt="google sign-in"/>
            </div>
            <div>{name}</div>
            <div>{email}</div>
            <button className='btn-primary' onClick={logOut}>Log Out</button>
          </div>
        }
      </header>
      <div className="page-body">
       <Router>
        {/*All our Routes goes here!*/}
          {/*<Route path="/" component={} />*/}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/searchresults" component={SearchResultsPage} />
          <Route exact path="/experience" component={ExperiencePage} />
       </Router> 
       {/* footer goes here */}
      </div>
      {/* <footer>
        <div>Insert footer here</div>
      </footer> */}
    </div>
  );
}

export default App;