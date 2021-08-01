// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './NewHostForm.css'

// const NewHostForm = (props) => {
  
//     const [hostFullName, setHostFullName] = useState('');
//     const [hostAddress, setHostAddress] = useState('');
//     const [hostPhone, setHostPhone] = useState('');
//     const [hostIntroduction, setHostIntroduction] = useState('');
    
    
//     const BASE_URL = "https://localhost:5000/host";

//     const onFullNameChange = (event) => {
//         setHostFullName(event.target.value);
//         //updateSubmitButtonState(owner, title);
//     }
//     const onAddressChange = (event) => {
//         setHostAddress(event.target.value);
//         //updateSubmitButtonState(owner, title);
//     }
//     const onHostPhoneChange = (event) => {
//         setHostPhone(event.target.value);
//         //updateSubmitButtonState(owner, title);
//     }
//     const onHostIntroductionChange = (event) => {
//         setHostIntroduction(event.target.value);
//         //updateSubmitButtonState(owner, title);
//     }

//     // Handling Form Submissions - event handler
//     const onFormSubmit = (event) => {
//         // Prevent the browser submitting form and reloading the page
//         event.preventDefault();
//         // POST 'localhost:3000'
//         if (hostFullName !== '' && hostAddress !== '' && hostPhone
//         !== '' && hostIntroduction !== '') {
//             props.onSubmitCallback(hostFullName, hostAddress, hostPhone, hostIntroduction );
//             }

//         setHostFullName('');
//         setHostAddress('');
//         setHostPhone('');
//         setHostIntroduction('');
//     };

//     return (
//     <form class="update-host-form" onSubmit={onFormSubmit} >
//         <label>Full Name</label>
//         <input class={inputCssClass} type="text" class="invalid-form-input" name="full-name-input" id="full-name-input" value={hostFullName} onChange={onFullNameChange} />
//         <label>Address</label>
//         <input class={inputCssClass} type="text" class="invalid-form-input" name="address-input" id="address-input" value={hostAddress} onChange={onAddressChange} />
//         <label>Phone number </label>
//         <input class={inputCssClass} name="phone-input" id="phone-input" value={hostAddress} onChange={onHostPhoneChange} />
//         <label>Introduction </label>
//         <input class={inputCssClass} name="introduction-input" id="introduction-input" value={hostIntroduction} onChange={onHostIntroductionChange} />
//         {/*<button>Submit</button>*/}
//         {/*<input type="submit" />*/}
//         <button disabled={submitButtonDisableState} className= "submitButton" onClick={onFormSubmit}>update Host</button>
        
//     </form>

//     )
// };

// export default HostUpdateForm;