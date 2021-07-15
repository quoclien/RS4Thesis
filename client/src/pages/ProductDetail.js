import {Container, Grid} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";
import {GetAccessToken, GetViewingProduct} from "../utils/LocalStorage";
import ProductLine from "../components/ProductLine";
import ProductLineKeys from "../models/ProductLineKeys";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "80px"
    }
}))

export default function ProductDetail(){
    const classes = useStyles();
    let product;
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);

    const firstUrl = "http://127.0.0.1:5000/ucf_rec/60963da2b2a5dad152d960be";
    const secondUrl = "http://127.0.0.1:5000/iir_rec/wilson";

    const firstLineKeys = new ProductLineKeys("_id", "name", "price", "image_urls");
    const secondLineKeys = new ProductLineKeys("_id", "title", "rating", "icon");
    useEffect(() => {
        if (GetAccessToken() === "")
        {
            history.push("/");
            return;
        }
        product = JSON.parse(GetViewingProduct());
        axios.get(firstUrl, {
            headers: {"Access-Control-Allow-Origin": "*",
            },
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let productLines = response.data.data;
            setFirstLine(productLines);
        });

        axios.get(secondUrl, {
            headers: {"Access-Control-Allow-Origin": "*"},
        }).then(response => {
            let productLines = response.data.data;
            setSecondLine(productLines);
        });
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
            />
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
            <Grid container className={classes.content}>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"You should try"}
                        lineOfProducts={firstLine}
                        lineKeys={firstLineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"Others also try"}
                        lineOfProducts={secondLine}
                        lineKeys={secondLineKeys}
                    >
                    </ProductLine>
                </Grid>
            </Grid>
        </Container>
    );
}