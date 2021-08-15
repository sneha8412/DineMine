import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './HostProfile.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ExperienceDetails from './ExperienceDetails';
import SearchResult from './SearchResult';
import './HostExperienceList.css';
import config from '../config.json';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { SettingsBrightnessOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

function HostExperienceList(props) {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const [hostExperiencesWithImages, setHostExperiencesWithImages] = React.useState([]);
    const [hostId, setHostId] = React.useState("");

    const BASE_URL = config.SERVER_URL;
    
    const getHostExperiences = () => {
        axios.get(`${BASE_URL}/experiences/hosts/${props.hostId}`,
        {

        }).then((response) => {

                console.log("Get Host Experiences With Images: " + response?.data);
                setHostExperiencesWithImages(response?.data);
            },
            (error) => {
                console.log("Get Host Experiences: " + error);
            }
        );
    };


    useEffect(() => {
        
        console.log("HostExperienceList useEffect");
        
        if (props.hostId)
        {
            setHostId(props.hostId);
            getHostExperiences();
        }

    }, [props.hostId]);

    const generateRandomRating = () => {
        const randomRating = Math.random() * 5;
        const roundedRandomRating = Math.round(randomRating * 100) / 100;
        return roundedRandomRating;
    };

    const handleDeleteExperience = (expIdToDelete) => {

        axios.delete(`${BASE_URL}/experiences/${expIdToDelete}`).then((response) => {

                console.log("Delete Experience id: " + expIdToDelete);
                getHostExperiences();
            },
            (error) => {
                console.log("Error Delete Experience id:: " + error);
            }
        );
    };

    const renderExperienceCards = () => {

        return hostExperiencesWithImages?.map((exp) => {
            const expId = exp["Experience ID"];
            let imgHash = Date.now();
            const expImageId = exp["ImageId"];
            const imgUrl = `${BASE_URL}/images/${expImageId}?${imgHash}`;
            console.log(`render image url for ${expId}: " + ${imgUrl}`);
            return (
                <div>
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => handleDeleteExperience(expId)}>
                        <DeleteIcon />
                    </IconButton>
                    <SearchResult
                        key={expId}
                        img={imgUrl}
                        location={exp["City"]}
                        title={exp["Title"]}
                        description={exp["Description"]}
                        star={generateRandomRating()}
                        price={exp["Price"]}
                        cuisine={exp["Cuisine"]}
                        dinetime={exp["Dine time"]}
                        itemId={expId}
                        guests = {exp["Total number of guests"]}
                        context= { {"hostId": hostId, "type": "host" } }
                        />
                </div>
            );
        });        
    };

    return (
        <div>
            {renderExperienceCards()}
        </div>
    );
};

export default HostExperienceList;