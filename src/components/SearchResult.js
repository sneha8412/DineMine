import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";

function SearchResult({
    img,
    location,
    title,
    description,
    star,
    price,
    cuisine,
    dinetime,
    itemId
}) {

    const history = useHistory();

    const handleOnClick = (itemId) => {

        history.push({
            pathname: "/experience",
            state: { 
                experienceId: itemId,
                //experienceImageUploadUrl: `http://localhost:5000/images/experience/${itemId}/upload`
            }
        });
    }

    return (
        <div className='searchResult' onClick={() => handleOnClick(itemId)}>
            <img src={img} alt="" />
            <FavoriteBorderIcon className="searchResult__heart" />

            <div className='searchResult__info'>
                <div className="searchResult__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{cuisine}</p>
                    <p>{dinetime}</p>
                    <p>{description}</p>
                </div>

                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className='searchResults__price'>
                        <h2>{price}</h2>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult
