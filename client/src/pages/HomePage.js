import React from 'react';
import {Button, Container, Divider, Grid} from '@material-ui/core';
import CustomizedRadios from "../components/CustomizedRadios";
import CustomizedPaper from "../components/CustomizedPaper";
import SelectAndShowField from "../components/SelectAndShowField";
import Dashboard from "../components/Dashboard";


function HomePage() {
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
        <Grid container>
            <CustomizedRadios
                children ={choices}
                legend={"Choose one algo:"}
                isRow={true}
            ></CustomizedRadios>
            <Divider/>
            <SelectAndShowField></SelectAndShowField>
            <Divider />
            <CustomizedPaper></CustomizedPaper>
            <Divider />
        </Grid>
    </Container>;
}

export default HomePage;