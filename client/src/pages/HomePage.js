import React from 'react';
import {Button, Container, Divider} from '@material-ui/core';
import CustomizedRadios from "../components/CustomizedRadios";
import CustomizedPaper from "../components/CustomizedPaper";

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
        <CustomizedRadios
            children ={choices}
            legend={"Choose one algo:"}
            isRow={true}
        ></CustomizedRadios>
        <Divider />
        <CustomizedPaper></CustomizedPaper>
        <Divider />
    </Container>;
}

export default HomePage;