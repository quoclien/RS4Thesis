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
        {/*<Grid container className={classes.content}>*/}
        {/*    <Grid item xs={12}>*/}
        {/*        <ProductLine*/}
        {/*            lineTitle={"You should try"}*/}
        {/*            lineOfProducts={firstLine}*/}
        {/*            lineKeys={firstLineKeys}*/}
        {/*        >*/}
        {/*        </ProductLine>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12}>*/}
        {/*        <ProductLine*/}
        {/*            lineTitle={"Others also try"}*/}
        {/*            lineOfProducts={secondLine}*/}
        {/*            lineKeys={secondLineKeys}*/}
        {/*        >*/}
        {/*        </ProductLine>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}
    </Container>;
}

export default HomePage;