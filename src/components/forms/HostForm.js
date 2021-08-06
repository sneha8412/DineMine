import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import RadioGroup from './RadioGroup';
import Input from './Input'
import FormButton from './FormButton';
import { createNewHost } from '../../services/hostService';
import ImageUpload from '../../components/ImageUpload'
import { useHistory } from 'react-router-dom';
import axios from "axios";

const initialFValues = {
    hostFullname: '',
    hostPhone: '',
    hostIntroduction: '',
    hostAddress: '',
    hostEmail:'',
    hostCity: ''

}


function HostForm() {

    const [imageUploadUrl, setImageUploadUrl] = useState("");

    const history = useHistory();

    const [hostId, setHostId] = useState("");

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('hostFullname' in fieldValues)
            temp.hostFullname = fieldValues.hostFullname ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city =fieldValues.city ? "" : "This field is required."
        if ('hostIntroduction' in fieldValues)
            temp.hostIntroduction = fieldValues.hostIntroduction ? "" : "This field is required."
        if ('hostEmail' in fieldValues)
            temp.hostEmail = (/$^|.+@.+..+/).test(fieldValues.hostEmail) ? "" : "Email is not valid."
        if ('hostPhone' in fieldValues)
            temp.hostPhone = fieldValues.hostPhone.length > 9 ? "" : "Minimum 10 numbers required."
        // if ('CertifiedKitchen' in fieldValues)
        //     temp.CertifiedKitchen = fieldValues.CertifiedKitchen != false ? "" : "You must have a certified Kitchen."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        
        // TODO remove after fxiing
        history.push({
            pathname: "/hostprofile",
            state: { 
                hostImageUploadUrl: `http://localhost:5000/images/host/18/upload`,
                hostId: 18
            }
        });

        // TOOD remove
        
        if (validate()){
            // employeeService.insertEmployee(values)

            // create host json object to send to backend
            const host = { 
                "name": values.hostFullname,
                "address": values.hostAddress,
                "intro": values.hostIntroduction,
                "city": values.hostCity,
                "phone": values.hostPhone,
                "email": values.hostEmail
            }

            axios.post(`http://localhost:5000/hosts`, host)
              
                .then((response) => {

                    console.log(response.data, '!');
                    const host_id = response.data["host_id"];
                    console.log("form submit handler" + host_id);
                    //setHostId(host_id);
                    //setImageUploadUrl(`http://localhost:5000/images/host/${host_id}/upload`);
                    //resetForm();

                    history.push({
                        pathname: "/hostprofile",
                        state: { 
                            hostImageUploadUrl: `http://localhost:5000/images/host/${host_id}/upload`,
                            hostId: host_id 
                        }
                    });

                }, 
                (error) => {
                    console.log(error);
                });
        }
    }

    // const handleHostImageUpload = e => {

    //     e.preventDefault();

    //     if (values.hostImage)
    //     {   
    //        const img_upload_url = `http://localhost:5000/images/host/${hostId}/upload`;
           
    //        axios.post(img_upload_url, { "pic": `${values.hostImage}` })
    //        .then((response) => {
    //          console.log(response.data, '!');
             
    //        }, (error) => {
    //          console.log(error);
    //        });
    //     }

    // }


    return(
        <div>
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>

                    <Input
                    name ="hostFullname"
                    label ="Full name"
                    value = {values.hostFullname}
                    onChange = {handleInputChange}
                    error = {errors.hostFullname}
                    />

                    <Input 
                    name="hostEmail"
                    label ="Email"
                    value = {values.hostEmail}
                    error= {errors.hostEmail}
                    onChange ={handleInputChange}
                    />
                    
                    <Input
                    name="hostPhone"
                    label ="Phone no."
                    onChange = {handleInputChange}
                    value = {values.hostPhone}
                    error ={errors.hostPhone}
                    />

                    <Input
                    name="hostAddress"
                    label ="Address"
                    value = {values.hostAddress}
                    onChange ={handleInputChange}
                    error ={errors.hostAddress}
                    /> 

                    <Input 
                    label="City"
                    name="hostCity"
                    value={values.hostCity}
                    onChange={handleInputChange}
                    />

                    <Input 
                    label="Introduction"
                    name="hostIntroduction"
                    value={values.hostIntroduction}
                    onChange={handleInputChange}
                    />
                    
                </Grid>

                <Grid item xs = {2}>
                    
                        {/* <RadioGroup 
                        name = "CertifiedKitchen"
                        lable = "Kitchen Certified for commercial cooking? "
                        value = {values.CertifiedKitchen}
                        onChange = {handleInputChange} 
                        items={false}
                        /> */}
                
          
                        <FormButton
                            type="submit"
                            text="Submit" 
                            onClick={handleSubmit}/>
                        <FormButton
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                 
                </Grid> 
                
            </Grid>

        </Form>

         {/* <Form>
                <Grid container>
                    <Grid item xs={3}>
                    <Input 
                        name="hostImage"
                        label ="Upload display picture"
                        value = {values.hostImage}
                        onChange ={handleInputChange}
                        error ={errors.hostImage}
                        />
                    <FormButton
                        type="file"
                        text="Select image" 
                        onClick={handleHostImageUpload}/>
                    <FormButton
                        type="submit"
                        text="Upload Image" 
                        onClick={handleHostImageUpload}/>
                    </Grid>
                </Grid>
          </Form> */}


        {/* <ImageUpload imageUploadUrl={imageUploadUrl} />  */}
        {/* need to pass in data that is not hard coded */}
        </div>
        
    )
};

export default HostForm