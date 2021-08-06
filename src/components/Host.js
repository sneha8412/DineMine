import React from 'react';
import './Host.css';
import { Paper,makeStyles } from '@material-ui/core';
import HostForm from './forms/HostForm';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";
//parent component for hostform
import ExperienceForm from './forms/ExperienceForm'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function Host(){

    const history = useHistory();

    return (
        <Paper elevation={5} className="newHost__formDisplay">
            <h1 > Create a host profile </h1>
            <HostForm />
        </Paper>
    )
}
export default Host;