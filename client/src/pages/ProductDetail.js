import {Container, Grid} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import {ExitToApp} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";
import {GetAccessToken, GetViewingProductId} from "../utils/LocalStorage";
import ProductLine from "../components/ProductLine";
import ProductLineKeys from "../models/ProductLineKeys";
import axios from "axios";
import {mockDataEvent} from "../utils/MockData";

const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "80px"
    }
}))

export default function ProductDetail() {
    const classes = useStyles();
    let productId;
    const [firstLine, setFirstLine] = useState([]);
    const [secondLine, setSecondLine] = useState([]);
    const [thirdLine, setThirdLine] = useState([]);
    const [product, setProduct] = useState([]);

    const productDetailUrl = "http://127.0.0.1:5000/products";
    const firstUrlPathVar = GetViewingProductId();
    const firstUrl = `http://127.0.0.1:5000/ctf_rec/${firstUrlPathVar}`;
    const secondUrl = "http://127.0.0.1:5000/pf_rec";
    const thirdUrl = "http://127.0.0.1:5000/ctp_rec/get";

    const lineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    useEffect(() => {
        if (GetAccessToken() === "") {
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
        }).catch(e => {
            console.log(e)
        });

        // Get second recommender product line
        axios.get(secondUrl, {
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let events = response.data.data;
            setSecondLine(events);
        }).catch(error => {
            console.log(error);
        });

        // Get third recommender product line
        axios(
            {
                url: thirdUrl,
                method: "POST",
                data: {
                    "origin": [
                        {
                            "value": "Hàn Quốc",
                            "score": 5
                        }
                    ],
                    "category": [
                        {
                            "value": "Điện thoại",
                            "score": 2
                        }
                    ]
                },
            }
        )
            .then(response => {
                let productLine = response.data.data;
                setThirdLine(productLine);
            }).catch(e => {
            console.log(e)
        });
    }, [])

    function handleOpenHomePage() {
        history.push("/home");
    }

    function handleSignOut() {
        history.push("/");
    }

    return (
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
                        lineTitle={"CTF"}
                        lineOfProducts={firstLine}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"PF"}
                        lineOfProducts={secondLine}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"CTP"}
                        lineOfProducts={thirdLine}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
            </Grid>
        </Container>
    );
}