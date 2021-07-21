import {Container, Grid} from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import {ExitToApp} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import history from "../utils/History";
import ProductDetailCard from "../components/ProductDetailCard";
import {makeStyles} from "@material-ui/core/styles";
import {Get3RecentProducts, GetUserId, GetViewingProduct, Set3RecentProducts} from "../utils/LocalStorage";
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
    const [ctfData, setCtfData] = useState([]);
    const [pfData, setPfData] = useState([]);
    const [ctpData, setCtpData] = useState([]);
    const [product, setProduct] = useState([]);

    const userId = GetUserId();
    const addEventUrl = "http://127.0.0.1:5000/user/add-events";
    const productDetailUrl = "http://127.0.0.1:5000/products";
    const viewingProduct = GetViewingProduct();
    let productId;
    const ctfUrl = `http://127.0.0.1:5000/ctf_rec/`;
    const pfUrl = "http://127.0.0.1:5000/pf_rec/null";
    const ctpUrl = "http://127.0.0.1:5000/ctp_rec/get";

    const ctpDefaultBody = {
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
    };

    const lineKeys = new ProductLineKeys("product_id", "name", "price", "image");
    useEffect(() => {
        if (userId === null) {
            history.push("/");
            return;
        }

        productId = viewingProduct["product_id"];

        // Add view event with the current product
        axios({
            url: addEventUrl,
            method: "POST",
            data:{
                "user_id": GetUserId(),
                "product_id": productId,
                "event_type" : "view"
            }
        }).then(res => {

        });


        // Get product for product detail card
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
        axios.get(ctfUrl + productId).then(response => {
            let productLine = response.data.data;
            setCtfData(productLine);
        }).catch(e => {
            console.log(e)
        });

        // Get second recommender product line
        axios.get(pfUrl, {
            params: {
                page: 0,
                limit: 10
            }
        }).then(response => {
            let productLine = response.data.data;
            setPfData(productLine);
        }).catch(error => {
            console.log(error);
        });

        // Create CTP body
        let current3RecentProducts = Get3RecentProducts();
        if (current3RecentProducts === null)
        {
            current3RecentProducts = [viewingProduct];
            Set3RecentProducts(current3RecentProducts);
        }
        else
        {
            // if current3RecentProducts not contain viewingProduct
            if (!current3RecentProducts.some(pd => pd["product_id"] === productId))
            {
                // if current3RecentProducts length is >= 3
                if (current3RecentProducts.length >= 3)
                {
                    current3RecentProducts.shift();
                }
                current3RecentProducts.push(viewingProduct);
                Set3RecentProducts(current3RecentProducts);
            }
        }
        let ctpBody = createCtpBody(current3RecentProducts);
        console.log(ctpBody);
        // Get third recommender product line
        axios(
            {
                url: ctpUrl,
                method: "POST",
                data: ctpBody
            }
        )
            .then(response => {
                let productLine = response.data.data;
                setCtpData(productLine);
            }).catch(e => {
            console.log(e)
        });
    }, [])

    function createCtpBody(productArray)
    {
        const originScore = 2;
        const brandScore = 3;
        const categoryScore = 4;
        const colorScore = 1;
        let result = {
            "origin": [
            ],
            "category": [
            ],
            "brand": [
            ],
            "color": [
            ]
        };
        if (Array.isArray(productArray))
        {
            for (let pd of productArray)
            {
                result.origin.push(
                    {
                        "value": pd.origin,
                        "score": originScore
                    }
                );
                result.category.push(
                    {
                        "value": pd.category,
                        "score": categoryScore
                    }
                );
                result.brand.push(
                    {
                        "value": pd.brand,
                        "score": brandScore
                    }
                );
                result.color.push(
                    {
                        "value": pd.color,
                        "score": colorScore
                    }
                );
            }
        }
        return result;
    }

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
                        lineTitle={"Recommendations based on text"}
                        lineOfProducts={ctfData}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"Recommendations based on behavioral history"}
                        lineOfProducts={pfData}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
                <Grid item xs={12}>
                    <ProductLine
                        lineTitle={"Recommendations based on product's properties"}
                        lineOfProducts={ctpData}
                        lineKeys={lineKeys}
                    >
                    </ProductLine>
                </Grid>
            </Grid>
        </Container>
    );
}