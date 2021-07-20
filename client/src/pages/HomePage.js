import React, {useEffect} from 'react';
import {Container} from '@material-ui/core';
import Dashboard from "../components/Dashboard";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ExitToApp} from "@material-ui/icons";
import history from "../utils/History";
import InfiniteProductCardList from "../components/InfiniteProductCardList";
import {GetUserId, SetUbrBody} from "../utils/LocalStorage";

const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        marginTop: "80px",
    }
}))


function HomePage() {

    const getRatingsUrl = "http://127.0.0.1:5000/user/8/reviews";
    const ratingKeyAllowed = ["product_id", "rating"];

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
        axios.get(getRatingsUrl, {
            params: {
                page: 0,
                limit: 10
            }
        }).then(r => {
            let ratings = r.data.data;
            let result = [];
            for (let rating of ratings)
            {
                rating = Object.keys(rating)
                    .filter(key => ratingKeyAllowed.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = rating[key];
                        return obj;
                    }, {});
                result.push(rating);
            }
            SetUbrBody(result);
        })
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