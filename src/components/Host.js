import React from 'react';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import Header from './Header';
import HostForm from './HostForm';
//parent component for hostform


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


function Host(){
    return (
        <>
        {/* <Header
            title="Create a host profile"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        /> */}
        <Paper>
            <HostForm />
        </Paper>
    </>
    )
}
export default Host;