import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './NewUserForm.css'

const NewUserForm = (props) => {
  
    const [userFullName, setUserFullName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [username, setUsername] = useState('');
    
    
    const BASE_URL = "https://localhost:5000/user";

    const onUserFullNameChange = (event) => {
        setUserFullName(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onUserAddressChange = (event) => {
        setUserAddress(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onUserPhoneChange = (event) => {
        setUserPhone(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onUsernameChange = (event) => {
        setUsername(event.target.value);
        //updateSubmitButtonState(owner, title);
    }

    // Handling Form Submissions - event handler
    const onFormSubmit = (event) => {
        // Prevent the browser submitting form and reloading the page
        event.preventDefault();
        // POST 'localhost:3000'
        if (userFullName !== '' && userAddress !== '' && userPhone
        !== '' && username !== '') 
        {
            props.onSubmitCallback(userFullName, userAddress, userPhone, username );
        }

        setUserFullName('');
        setUserAddress('');
        setUserPhone('');
        setUsername('');
    };

    return (
    <form class="new-user-form" onSubmit={onFormSubmit} >
        <label>Full Name</label>
        <input  type="text" class="invalid-form-input" name="user-full-name-input" id="user-full-name-input" value={userFullName} onChange={onUserFullNameChange} />
        <label>Address</label>
        <input  type="text" class="invalid-form-input" name="user-address-input" id="user-address-input" value={userAddress} onChange={onUserAddressChange} />
        <label>Phone number </label>
        <input  name="phone-input" id="user-phone-input" value={userAddress} onChange={onUserPhoneChange} />
        <label>Introduction </label>
        <input  name="introduction-input" id="username-input" value={username} onChange={onUsernameChange} />
        {/*<button>Submit</button>*/}
        {/*<input type="submit" />*/}
        <button  className= "submitButton" onClick={onFormSubmit}>Create A User Profile</button>
        
    </form>

    )
};

export default NewUserForm;