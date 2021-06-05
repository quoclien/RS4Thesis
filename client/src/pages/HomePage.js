import React from 'react';
import {Button, Container, Divider, Grid} from '@material-ui/core';
import CustomizedRadios from "../components/CustomizedRadios";
import CustomizedPaper from "../components/CustomizedPaper";
import SelectAndShowField from "../components/SelectAndShowField";
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import RecommenderLine from "../components/RecommenderLine";

const useStyles = makeStyles((theme) => ({
    root: {

    },
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
        <Dashboard/>
        <Grid container className={classes.content}>
            <Grid item xs={12}>
                {/*<CustomizedRadios*/}
                {/*    children ={choices}*/}
                {/*    legend={"Choose one algo:"}*/}
                {/*    isRow={true}*/}
                {/*    */}
                {/*></CustomizedRadios>*/}
                <RecommenderLine
                    lineTitle={"You should try"}
                    lineOfProducts={productLines}
                    >
                </RecommenderLine>
            </Grid>
            <Grid item xs={12}>
                <RecommenderLine
                    lineTitle={"Others also try"}
                    lineOfProducts={productLines}
                >
                </RecommenderLine>
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