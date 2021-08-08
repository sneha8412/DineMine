import React, { useState, useEffect } from 'react';
import { FormControlLabel, Grid, Paper } from '@material-ui/core';
import { useForm, Form } from './UseForm';
import RadioGroup from './RadioGroup';
import Input from './Input'
import FormButton from './FormButton';
import ImageUpload from '../ImageUpload';
import './ExperienceForm.css';

const initialFValues = {
    title: '',
    price: 0.0,
    description: '',
    cuisine: '',
    dinetime: '', 
    city: ''

}

function ExperienceForm(props) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title= fieldValues.title ? "" : "This field is required."
        if ('price $' in fieldValues)
            temp.price = fieldValues.price < 0.00 ? "": "This field is required." 
        if ('description' in fieldValues)
            temp.hdescription = fieldValues.description ? "" : "This field is required."
        if ('cuisine' in fieldValues)
            temp.cuisine = fieldValues.cuisine? "" : "Cuisine is not valid." 
        if ('dinetime' in fieldValues)
            temp.dinetime = fieldValues.dinetime ? "" : "Enter one: Breakfast, Brunch, lunch, tea time, Dinner."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "You must enter the city name."
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
            resetForm()
        }
    }


    return(
        <div>
        <Paper elevation={5}>
        <Form onSubmit={handleSubmit}>
          <h1 className="your__Experience" >Your Experience</h1>
            <Grid container className="Form__Input">
                
                <Grid item xs={8}>

                    <Input
                    name ="title"
                    label ="Experience Title"
                    value = {values.title}
                    onChange = {handleInputChange}
                    error = {errors.title}
                    />

                    <Input 
                    name="price"
                    label ="Price $"
                    value = {values.price}
                    error= {errors.price}
                    onChange ={handleInputChange}
                    />
                    
                    <Input
                    name="description"
                    label ="Description"
                    onChange = {handleInputChange}
                    value = {values.description}
                    error ={errors.description}
                    />

                    <Input
                    name="cuisine"
                    label ="Cuisine"
                    value = {values.cuisine}
                    onChange ={handleInputChange}
                    error ={errors.cuisine}
                    /> 

                    <Input 
                    name="dinetime"
                    label="Dine time - Enter: Breakfast, Brunch, Lunch, Tea-Time, or Dinner"
                    value={values.dinetime}
                    onChange={handleInputChange}
                    />

                    <Input 
                    name="city"
                    label ="City"
                    value = {values.city}
                    onChange ={handleInputChange}
                    error ={errors.city} 
                    />

                    
                </Grid>

                <Grid item xs = {4}>
                    
                        {/* <RadioGroup 
                        name = "CertifiedKitchen"
                        lable = "Kitchen Certified for commercial cooking? "
                        value = {values.CertifiedKitchen}
                        onChange = {handleInputChange} 
                        items={false}
                        /> 
                        */}
                
                    <div>
                        <FormButton
                            type="submit"
                            text="Save" />
                        <FormButton
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                 
                </Grid> 
                
            </Grid>

        </Form>

        <div className="Experience__PhotoUpload">
                <h1>Update Experience Images</h1>
                <ImageUpload imageUploadUrl=""/>
        </div>
        </Paper>
        </div>
        
    )
};

export default ExperienceForm