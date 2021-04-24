import React from 'react';
import {Button, Container} from '@material-ui/core';
import CustomizedRadios from "../components/CustomizedRadios";

function HomePage() {
    return <Container fixed>
        <div>Chon thuat toan:</div>
        <CustomizedRadios></CustomizedRadios>
        {/*<Button color="primary">Hello World</Button>*/}
    </Container>;
}

export default HomePage;