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
    const firstUrlPathVar = "60963da3b2a5dad152d974a1"
    const firstUrl = `http://127.0.0.1:5000/ctf_rec/${firstUrlPathVar}`;
    const secondUrl = "http://127.0.0.1:5000/ctp_rec";

    const firstLineKeys = new ProductLineKeys("_id", "name", "price", "image_urls");
    const secondLineKeys = new ProductLineKeys("_id", "name", "price", "image_urls");
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
            let productLines = response.data.data;
            setFirstLine(productLines);
        }).catch(e => {console.log(e)});

        // Get second recommender product line
        // axios.get(secondUrl, {
        //     headers: {"Access-Control-Allow-Origin": "*"},
        //     params: {
        //         page: 0,
        //         limit: 11,
        //         "product_group": {
        //             "value": "Beverages",
        //             "score": 5
        //         },
        //         "product_category": {
        //             "value": "Tea",
        //             "score": 1.5
        //         }
        //     }
        // }).then();

        // axios(
        //     {
        //         url: secondUrl,
        //         method: "POST",
        //         params: {
        //           page: 0,
        //           limit: 11,
        //         },
        //         data: {
        //             product_group: {
        //                 "value": "Beverages",
        //                 "score": 5
        //             },
        //             product_category: {
        //                 "value": "Tea",
        //                 "score": 1.5
        //             }
        //         },
        //         headers: {
        //             'Access-Control-Allow-Origin' : '*',
        //             'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         },
        //     }
        // )
        //     .then(response => {
        //     let productLines = response.data.data;
        //     console.log(productLines)
        //     setSecondLine(productLines);
        // }).catch(e => {console.log("error on product line 2 ", e)});
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
                        lineOfProducts={mockDataCtf}
                        lineKeys={firstLineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"Others also try"}
                        lineOfProducts={mockDataPC}
                        lineKeys={secondLineKeys}
                    >
                    </ProductLine>
                </Grid>
            </Grid>
        </Container>
    );
}