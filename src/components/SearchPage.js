import React from 'react';
import './SearchPage.css';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";

function SearchPage() {
    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>62 DineMines · 26 august · 2 guest</p>
                <h1>DineMines nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of Cusine</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Dine Times</Button>
                <Button variant="outlined">Location</Button>
            </div>
            <SearchResult
                img="https://images.unsplash.com/photo-1573225342350-16731dd9bf3d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=957&q=80"
                location="Redmond"
                title="Rustic Farm to Table Dining Experience"
                description=" Seats 2 guest · Free parking · Outdoor seating · Non-Veg "
                star={4.73}
                price="$20 / person"
                
            />

            <SearchResult
                img="https://images.unsplash.com/photo-1592178036268-cffc32b23b14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                location="Issaquah"
                title="The ultimate outdoor grill experience"
                description="seats 6 guest · Outdoor · Private party . Lunch · Non-Veg "
                star={4.3}
                price="$18 / person"
                
            />

            <SearchResult
                img="https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
                location="Redmond"
                title="Vegan delight"
                description="seats 4 guest ·Vegan buffet · Free parking · Dinner · Vegan · Vegetarian"
                star={3.8}
                price="$15 / person"
                
            />
            <SearchResult
                img="https://images.unsplash.com/photo-1608350911676-5975d658264e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
                location="Bellevue"
                title="Fresh hand-rolled Sushi"
                description="seats 4 guest · Sushi · Free parking · Non-veg · Dinner"
                star={4.1}
                price="$20 / night"
                
            />
            <SearchResult
                img="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bHVuY2glMjBpdGFsaWFufGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                location="Seattle"
                title="American Fries and Burger "
                description="Seats 6 guest · Vegetarian · Free parking · Non-veg · Lunch and Dinner · Private dining room "
                star={5.0}
                price="$12 / night"
                
            />
            <SearchResult
                img="https://images.unsplash.com/photo-1600057858461-d15e7dfc6306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
                location="Mercer Island"
                title="Organic Stone Fired Pizza"
                description="Seats 10 guest · Outdoor Seating · Vegetarian · Free Parking · Lunch and Dinner"
                star={4.23}
                price="$20 / person"
                
            />
            <SearchResult
                img="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                location="Seattle"
                title="Organic Vegetarian Breakfast"
                description="10 guest · Vegetarian · Vegan · Breakfast · Free parking · Outdoor"
                star={3.85}
                price="$10/ person"
            />
        </div>
    )
}

export default SearchPage
