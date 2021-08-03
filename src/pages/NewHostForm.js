import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageUpload from '../components/ImageUpload';
// import './NewHostForm.css'

function NewHostForm() {
  
    const [hostFullName, setHostFullName] = useState('');
    const [hostAddress, setHostAddress] = useState('');
    const [hostPhone, setHostPhone] = useState('');
    const [hostIntroduction, setHostIntroduction] = useState('');
    
    
    const BASE_URL = "https://localhost:5000/host";

    const onFullNameChange = (event) => {
        setHostFullName(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onAddressChange = (event) => {
        setHostAddress(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onHostPhoneChange = (event) => {
        setHostPhone(event.target.value);
        //updateSubmitButtonState(owner, title);
    }
    const onHostIntroductionChange = (event) => {
        setHostIntroduction(event.target.value);
        //updateSubmitButtonState(owner, title);
    }

    // Handling Form Submissions - event handler
    const onFormSubmit = (event) => {
        // Prevent the browser submitting form and reloading the page
        event.preventDefault();
        // POST 'localhost:3000'

        // if (hostFullName !== '' && hostAddress !== '' && hostPhone
        // !== '' && hostIntroduction !== '') {
        //     props.onSubmitCallback(hostFullName, hostAddress, hostPhone, hostIntroduction );
        //     }

        setHostFullName('');
        setHostAddress('');
        setHostPhone('');
        setHostIntroduction('');
    };

    return (
    <div>
        <form class="new-host-form" onSubmit={onFormSubmit} >
            <label>Full Name</label>
            <input  type="text" class="invalid-form-input" name="full-name-input" id="full-name-input" value={hostFullName} onChange={onFullNameChange} />
            <label>Address</label>
            <input  type="text" class="invalid-form-input" name="address-input" id="address-input" value={hostAddress} onChange={onAddressChange} />
            <label>Phone number </label>
            <input  name="phone-input" id="phone-input" value={hostAddress} onChange={onHostPhoneChange} />
            <label>Introduction </label>
            <input  name="introduction-input" id="introduction-input" value={hostIntroduction} onChange={onHostIntroductionChange} />
            {/*<button>Submit</button>*/}
            {/*<input type="submit" />*/}
            <button  className= "submitButton" onClick={onFormSubmit}>Create a Host Profile</button>
            
        </form>
        <ImageUpload upload_url="http://localhost:5000/images/upload" />
    </div>

    )
};

export default NewHostForm;