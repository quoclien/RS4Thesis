import React from 'react';
import {Container, Grid} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import ProductLine from "../components/ProductLine";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        marginTop: "80px",
    }
}))

const productLines = {
    products: [],
    items: [],
    others: [],
    misc: [],
    notes: []
}

function handleSignOut() {
    history.push("/");
}

function handleOpenProfile(){
    history.push("/profile");
}


function HomePage() {

    const classes = useStyles();
    let choices = [
        {
            value: "content",
            label: "Content-based filtering"
        },
        {
            value: "collab",
            label: "Collaborative-based filtering",
        },
        {
            value: "hybrid",
            label: "Hybrid Filtering",
        }
    ];
    return <Container fixed>
        <Dashboard
            leftButtonIcon={<AccountCircleIcon/>}
            rightButtonIcon={<ExitToApp/>}
            handleRightButtonClick={handleSignOut}
            handleLeftButtonClick={handleOpenProfile}
        ></Dashboard>
        <Grid container className={classes.content}>
            <Grid item xs={12}>
                {/*<CustomizedRadios*/}
                {/*    children ={choices}*/}
                {/*    legend={"Choose one algo:"}*/}
                {/*    isRow={true}*/}
                {/*    */}
                {/*></CustomizedRadios>*/}
                <ProductLine
                    lineTitle={"You should try"}
                    lineOfProducts={productLines}
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