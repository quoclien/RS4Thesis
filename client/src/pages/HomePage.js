import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import ProductLine from "../components/ProductLine";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import ProductLineKeys from "../models/ProductLineKeys";
import {GetAccessToken} from "../utils/LocalStorage";
import InfiniteProductCardList from "../components/InfiniteProductCardList";
const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        marginTop: "80px",
    }
}))



function HomePage() {

    function handleSignOut() {
        history.push("/");
    }

    function handleOpenProfile(){
        history.push("/profile");
    }

    useEffect(() => {

    }, [])

    const classes = useStyles();
    return <Container fixed>
        <Dashboard
            leftButtonIcon={<AccountCircleIcon/>}
            rightButtonIcon={<ExitToApp/>}
            handleRightButtonClick={handleSignOut}
            handleLeftButtonClick={handleOpenProfile}
        ></Dashboard>
        <div className={classes.content}>
            <InfiniteProductCardList/>
        </div>
    </Container>;
}

export default HomePage;