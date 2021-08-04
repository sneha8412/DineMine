import React from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ExperienceForm from './forms/ExperienceForm';
//parent component for hostform


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function Experience(){

    return (
        
        <Paper>
            <ExperienceForm/>
        </Paper>
    
    )
}
export default Experience