import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './NewExperienceForm.css'

const NewExperienceForm = (props) => {
  
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dinetime, setDinetime] = useState('');
     
    
    const BASE_URL = "https://localhost:5000/host/<host_id>/experience";//not sure

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value);
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const onCuisineChange = (event) => {
        setCuisine(event.target.value);
    }
    const onDinetimeChange = (event) => {
        setDinetime(event.target.value);
    }

    // Handling Form Submissions - event handler
    const onFormSubmit = (event) => {
        // Prevent the browser submitting form and reloading the page
        event.preventDefault();
        // POST 'localhost:3000'
        if (title !== '' && price !== '' && cuisine
        !== '' && dinetime !== '' && description !== '') {
            props.onSubmitCallback(title, price, cuisine, dinetime, description );
            }

        setTitle('');
        setPrice('');
        setCuisine('');
        setDinetime('');
        setDescription('');
    };

    return (
    <form class="new-exp-form" onSubmit={onFormSubmit} >
        <label>Title</label>
        <input  type="text" class="invalid-form-input" name="title-input" id="title-input" value={title} onChange={onTitleChange} />
        <label>Price</label>
        <input  type="text" class="invalid-form-input" name="price-input" id="price-input" value={price} onChange={onPriceChange} />
        <label>Cuisine </label>
        <input  name="cuisine-input" id="cuisine-input" value={cuisine} onChange={onCuisineChange} />
        
        <label>Description </label>
        <input  name="description-input" id="description-input" value={description} onChange={onDescriptionChange} />
        {/*<button>Submit</button>*/}
        {/*<input type="submit" />*/}
        <button className= "submitButton" onClick={onFormSubmit}>Create New Experience</button>
        
    </form>

    )
};

export default NewExperienceForm;