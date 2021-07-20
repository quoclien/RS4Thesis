import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import InfiniteProductCardList from "../components/InfiniteProductCardList";
import {GetUserId} from "../utils/LocalStorage";

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

    function handleOpenProfile() {
        history.push("/profile");
    }

    useEffect(() => {
        if (GetUserId() === null) {
            history.push("/");
        }
    }, [])

    const classes = useStyles();
    return <Container fixed>
        <Dashboard
            leftButtonIcon={<AccountCircleIcon/>}
            rightButtonIcon={<ExitToApp/>}
            handleRightButtonClick={handleSignOut}
            handleLeftButtonClick={handleOpenProfile}
        />
        <div className={classes.content}>
            <InfiniteProductCardList/>
        </div>
    </Container>;
}

export default HomePage;