import React, { useState, useEffect } from 'react';
import {Container, Grid} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import ProductLine from "../components/ProductLine";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
const axios = require('axios').default;

const url = "http://127.0.0.1:5000/ctf_rec/:item_id";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        marginTop: "80px",
    }
}))

let productLines = [
    1,2,3,4,5
]


function handleSignOut() {
    history.push("/");
}

function handleOpenProfile(){
    history.push("/profile");
}


function HomePage() {
    const [products, setProducts] = useState(productLines);

    useEffect(() => {
        // axios.get(url).then(response => {
        //     productLines = response.data;
        //     products = productLines;
        //     console.log(productLines);
        // });
        // axios({
        //     url: url,
        //     method: "GET",
        //     headers: {"Access-Control-Allow-Origin": "*"},
        //     params: {
        //         item_id: "60af6c73585bb9dc632b911b"
        //     }
        // })
    })

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
                    lineOfProducts={products}
                >
                </ProductLine>
            </Grid>
            <Grid item xs={12}>
                <ProductLine
                    lineTitle={"Others also try"}
                    lineOfProducts={productLines}
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