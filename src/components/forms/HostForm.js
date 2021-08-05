import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import RadioGroup from './RadioGroup';
import Input from './Input'
import FormButton from './FormButton';
import { createNewHost } from '../../services/hostService';

const initialFValues = {
    hostFullname: '',
    hostPhone: '',
    hostIntroduction: '',
    hostAddress: '',
    hostImage: null,
    hostEmail:'',
    CertifiedKitchen: false,
    city: ''

}


function HostForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('hostFullname' in fieldValues)
            temp.hostFullname = fieldValues.hostFullname ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('hostIntroduction' in fieldValues)
            temp.hostIntroduction = fieldValues.hostIntroduction ? "" : "This field is required."
        if ('hostEmail' in fieldValues)
            temp.hostEmail = (/$^|.+@.+..+/).test(fieldValues.hostEmail) ? "" : "Email is not valid."
        if ('hostPhone' in fieldValues)
            temp.hostPhone = fieldValues.hostPhone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('CertifiedKitchen' in fieldValues)
            temp.CertifiedKitchen = fieldValues.CertifiedKitchen != false ? "" : "You must have a certified Kitchen."
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
        if (validate()){
            // employeeService.insertEmployee(values)

            // Call backend api to upload image 
            //createNewHost()
            
            resetForm()
        }
    }


    return(
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>

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
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    />

                    <Input 
                    name="hostImage"
                    label ="Upload display picture"
                    value = {values.hostImage}
                    onChange ={handleInputChange}
                    error ={errors.hostImage}
                    />

                    <Input 
                    label="Introduction"
                    name="Introduction"
                    value={values.hostIntroduction}
                    onChange={handleInputChange}
                    />
                    
                </Grid>

                <Grid item xs = {6}>
                    
                        <RadioGroup 
                        name = "CertifiedKitchen"
                        lable = "Kitchen Certified for commercial cooking? "
                        value = {values.CertifiedKitchen}
                        onChange = {handleInputChange} 
                        items={false}
                        />
                
                    <div>
                        <FormButton
                            type="submit"
                            text="Submit" />
                        <FormButton
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                 
                </Grid> 
                
            </Grid>

        </Form>
    )
};

export default HostForm