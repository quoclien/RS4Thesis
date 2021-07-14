import React from 'react'
import {Grid, Typography, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";
import {makeStyles} from "@material-ui/core/styles";
import history from "../utils/History";
import {SetViewingProduct} from "../utils/LocalStorage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Test from "../pages/Test";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px",
        width: "auto",
        overflow: "auto",
        padding: "5px",
    },
    container: {
        width: "max-content",
    },
    carouselContainer:{
       width: "100%",
       height: "100%"
}
}))

export default function ProductLine(props) {
    const classes = useStyles();

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    function handleCardClick(product)
    {
        SetViewingProduct(JSON.stringify(product));
        history.push("/detail");
    }

    function generateLineOfProducts(keys, products) {
        let data = [];
        if (products.length > 0)
        {
            for (let i = 0; i < products.length; i++) {
                let _imageUrl, _key, _title, _subtitle;
                _imageUrl = _key = _title = _subtitle  = products[i] ;
                let imageUrlArray = keys.imageUrl.split(".");
                let keyArray = keys.id.split(".");
                let titleArray = keys.title.split(".");
                let subtitleArray = keys.subtitle.split(".");
                for (let val of imageUrlArray)
                {
                    _imageUrl = _imageUrl[val];
                    if (val === "image_urls")
                    {
                        _imageUrl = JSON.parse(_imageUrl)[0];
                    }
                }
                for (let val of keyArray)
                {
                    _key = _key[val];
                }
                for (let val of titleArray)
                {
                    _title = _title[val];
                }
                for (let val of subtitleArray)
                {
                    _subtitle = _subtitle[val];
                }
                data.push(
                    <CustomizedCard
                        cardContent={<ProductCard
                            imageUrl={_imageUrl}
                            key={_key}
                            title={_title}
                            subtitle={_subtitle}
                            handleCardClick={() => {handleCardClick(products[i])}}
                        ></ProductCard>}
                        cardAction={""}
                    />
                );
            }
        }
        return data;

    }
    return (
        <Paper className={classes.root}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom
                        className={{fontFamily: "Arial", fontWeight: "bold", fontSize: "30"}}>
                {props.lineTitle}
            </Typography>
            <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={true}
                className={""}
                containerClass={""}
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={true}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
            >
                {generateLineOfProducts(props.lineKeys ,props.lineOfProducts)}
            </Carousel>
        </Paper>
    );
}