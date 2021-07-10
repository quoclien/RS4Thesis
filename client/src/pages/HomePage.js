import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import ProductLine from "../components/ProductLine";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        marginTop: "80px",
    }
}))

let productsChosenForYou = [
    {
        id: 0,
        name: "Red Bull Summer Men short",
        price: "14 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ea7e2d999ecf941204c42ee-medium.jpg"
    },
    {
        id: 1,
        name: "Men's fashion short sleeve T-shirt",
        price: "22 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e951ed83843b713841430e1-medium.jpg"
    },
    {
        id: 2,
        name: "2020 Men's fish T-shirt",
        price: "34 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e04554af2db2e0211989d36-medium.jpg"
    },
    {
        id: 3,
        name: "Men's TikTok Summer T-shirt",
        price: "7 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ecdc68e46cdc10c6216940f-medium.jpg"
    },
    {
        id: 4,
        name: "Men's Summer Fashion T-shirt",
        price: "135 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5b04be45a7df63180c4f9c7e-medium.jpg"
    }
]

let productsOthersLiked = [
    {
        id: 0,
        name: "Couple's Slippers indoor bathroom",
        price: "26 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/58eeefc901ba331d47ca05d8-medium.jpg"
    },
    {
        id: 1,
        name: "Men's funny black T-shirt",
        price: "22 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ea139e452f5470ac02279e2-medium.jpg"
    },
    {
        id: 2,
        name: "2020 Men's fish T-shirt",
        price: "34 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5e04554af2db2e0211989d36-medium.jpg"
    },
    {
        id: 3,
        name: "Summer Cycling Jeysey Short",
        price: "23 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ed703113547ebad907edbc0-medium.jpg"
    },
    {
        id: 4,
        name: "Red Bull Summer Men short",
        price: "14 EUR",
        url: "http://canary.contestimg.wish.com/api/webimage/5ea7e2d999ecf941204c42ee-medium.jpg"
    }
]


function HomePage() {
    const [products, setProducts] = useState(0);

    const url = "http://127.0.0.1:5000/ucf_rec/60963da2b2a5dad152d960be";

    function handleSignOut() {
        history.push("/");
    }

    function handleOpenProfile(){
        history.push("/profile");
    }

    useEffect(() => {
        axios.get(url, {
                headers: {"Access-Control-Allow-Origin": "*"},
                params: {
                    page: 0,
                    limit: 10
                }
        }).then(response => {
            let productLines = response.data;
            // setProducts(productLines);
            console.log(productLines);
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
                    lineOfProducts={productsChosenForYou}
                >
                </ProductLine>
            </Grid>
            <Grid item xs={12}>
                <ProductLine
                    lineTitle={"Others also try"}
                    lineOfProducts={productsOthersLiked}
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