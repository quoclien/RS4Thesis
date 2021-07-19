import {Container, Grid} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {ExitToApp} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";
import {GetAccessToken, GetViewingProduct, GetViewingProductId} from "../utils/LocalStorage";
import ProductLine from "../components/ProductLine";
import ProductLineKeys from "../models/ProductLineKeys";
import axios from "axios";
import {mockDataCtf, mockDataEvent, mockDataPC} from "../utils/MockData";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "80px"
    }
}))

export default function ProductDetail(){
    const classes = useStyles();
    let productId;
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);
    const [product, setProduct] = useState(mockDataEvent[0]);

    const productDetailUrl = "http://127.0.0.1:5000/products";
    const firstUrlPathVar = GetViewingProductId();
    const firstUrl = `http://127.0.0.1:5000/ctf_rec/${firstUrlPathVar}`;
    const secondUrl = "http://127.0.0.1:5000/iir_rec/wilson";
    const thirdUrl = "http://127.0.0.1:5000/ctp_rec/get";

    const firstLineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    const secondLineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    useEffect(() => {
        if (GetAccessToken() === "")
        {
            history.push("/");
            return;
        }
        // Get product for product detail card
        productId = GetViewingProductId();
        axios.get(productDetailUrl, {
            params: {
                product_id: productId,
                page: 0,
                limit: 1
            }
        }).then(response => {
            let product = response.data;
            setProduct(product);
        }).catch(e => {
        });

        // Get first recommender product line
        axios.get(firstUrl).then(response => {
            let productLine = response.data.data;
            setFirstLine(productLine);
        }).catch(e => {console.log(e)});

        // Get second recommender product line
        axios(
            {
                url: secondUrl,
                method: "GET",
            }
        )
            .then(response => {
            let productLine = response.data.data;
            console.log(productLine)
            setSecondLine(productLine);
        }).catch(e => {console.log(e)});

        axios(
            {
                url: thirdUrl,
                method: "GET",
                params: {
                    page: 0,
                },
                data: {
                    "origin": [{
                        "value": "Hàn Quốc",
                        "score": 5
                    }],
                    "category": [{
                        "value": "Điện thoại",
                        "score": 2
                    }]
                },
                // headers: {
                //     'Access-Control-Allow-Origin' : '*',
                //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                // },
            }
        )
            .then(response => {
                let productLine = response;
                console.log(productLine)
            }).catch(e => {console.log(e)});
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
                    brand={product.brand}
                    title={product.name}
                    subtitle={product.price}
                    imageUrl={product.image}
                    category={product.category}
                    description={product.description}
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