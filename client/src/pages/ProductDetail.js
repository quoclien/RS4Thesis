import {Container} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "80px",
    }
}))

export default function ProductDetail(props){
    const classes = useStyles();
    function handleOpenHomePage(){
        history.push("/home");
    }

    function handleSignOut(){
        history.push("/");
    }
    return(
        <Container fixed>
            <Dashboard
                leftButtonIcon={<HomeIcon/>}
                rightButtonIcon={<ExitToApp/>}
                handleRightButtonClick={handleSignOut}
                handleLeftButtonClick={handleOpenHomePage}
            ></Dashboard>
            <div className={classes.content}>
                <ProductDetailCard/>
            </div>
        </Container>
    );
}