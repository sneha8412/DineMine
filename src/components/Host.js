import React from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import Header from './Header';
import HostForm from './forms/HostForm';
import Experience from './Experience';
import ExperienceForm from './forms/ExperienceForm';
import { useHistory } from "react-router-dom";
//parent component for hostform
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";




const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function Host(){

    const history = useHistory();

    const handleExperienceOnClick = () => {
        history.push('/newhost/newexperience');
    };

    return (
        <>
        {/* <Header
            title="Create a host profile"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        /> */}
        <Paper className="newHost__formDiaplay">
            <h1 > Create a host profile </h1>
            <HostForm />

            
            <div className='header__right'>
                <div className="createExperience__interactive" onClick={e => handleExperienceOnClick()}>
                    <h1> List a new Experience</h1>
                </div>
            </div>
            <Router>
                <Switch>
                    <Route path="/newhost/newexperience">
                    <Experience/>
                    </Route>
                </Switch>
            </Router>  
        {/* problem */}
             
        </Paper>
    </>
    )
}
export default Host;