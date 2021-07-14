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
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);

    const firstUrl = "http://127.0.0.1:5000/ucf_rec/60963da2b2a5dad152d960be";
    const secondUrl = "http://127.0.0.1:5000/iir_rec/wilson";

    const firstLineKeys = new ProductLineKeys("_id", "name", "price", "image_urls");
    const secondLineKeys = new ProductLineKeys("_id", "title", "rating", "icon");

    function handleSignOut() {
        history.push("/");
    }

    function handleOpenProfile(){
        history.push("/profile");
    }

    useEffect(() => {
        if (GetAccessToken() === "")
        {
            history.push("/");
            return;
        }
        axios.get(firstUrl, {
                headers: {"Access-Control-Allow-Origin": "*",
                },
                params: {
                    page: 0,
                    limit: 10
                }
        }).then(response => {
            let productLines = response.data.data;
            setFirstLine(productLines);
        });

        axios.get(secondUrl, {
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(response => {
            let productLines = response.data.data;
            setSecondLine(productLines);
        });
    }, [])

    const classes = useStyles();
    return <Container fixed>
        <Dashboard
            leftButtonIcon={<AccountCircleIcon/>}
            rightButtonIcon={<ExitToApp/>}
            handleRightButtonClick={handleSignOut}
            handleLeftButtonClick={handleOpenProfile}
        ></Dashboard>
        <Grid container className={classes.content}>
            <Grid item xs={12}>
                <ProductLine
                    lineTitle={"You should try"}
                    lineOfProducts={firstLine}
                    lineKeys={firstLineKeys}
                >
                </ProductLine>
            </Grid>
            <Grid item xs={12}>
                <ProductLine
                    lineTitle={"Others also try"}
                    lineOfProducts={secondLine}
                    lineKeys={secondLineKeys}
                >
                </ProductLine>
            </Grid>
            {/*<Divider/>*/}
            {/*<Grid item>*/}
            {/*    <SelectAndShowField></SelectAndShowField>*/}
            {/*</Grid>*/}
            {/*<Divider />*/}
            {/*<Grid item>*/}
            {/*    <CustomizedPaper></CustomizedPaper>*/}
            {/*</Grid>*/}
            {/*<Divider />*/}
        </Grid>
    </Container>;
}

export default HomePage;