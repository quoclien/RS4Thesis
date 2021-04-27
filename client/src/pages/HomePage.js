import React from 'react';
import {Button, Container} from '@material-ui/core';
import CustomizedRadios from "../components/CustomizedRadios";

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
        <div>Chon thuat toan:</div>
        <CustomizedRadios children ={choices}></CustomizedRadios>
        {/*<Button color="primary">Hello World</Button>*/}
    </Container>;
}

export default HomePage;