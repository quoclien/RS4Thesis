import {Container} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import React, {useEffect} from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";
import {GetAccessToken, GetViewingProduct} from "../utils/LocalStorage";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "80px",
    }
}))

export default function ProductDetail(){
    const classes = useStyles();
    let product;
    useEffect(() => {
        if (GetAccessToken() === "")
        {
            history.push("/");
            return;
        }
        product = JSON.parse(GetViewingProduct());
    },[])
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
                <ProductDetailCard
                    brand={"Tesla"}
                    title={"Self-driving car from Tesla"}
                    subtitle={"Try it! You will love it!"}
                    imageUrl={"https://cdn.tgdd.vn/Products/Images/7077/225949/mi-band-5-thum-600x600.jpg"}
                    content={"Lorem Ipsum Sitamet COndositaea"}
                    subcontent={"Marvel is a universe where we have the Hulk"}
                    descriptionTitle={"How to drive a self-driving car"}
                    description={"Just turn it on. Turn it on. Turn it on.Turn it on. Turn it on.Turn it on. Turn it on.Turn it on. Turn it on.Turn it on. Turn it on."}
                    extra={"By Tesla. With money"}
                />
            </div>
        </Container>
    );
}