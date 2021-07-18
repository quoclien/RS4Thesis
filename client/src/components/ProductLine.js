import React from 'react'
import {Grid, Typography, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";
import {makeStyles} from "@material-ui/core/styles";
import history from "../utils/History";
import {SetViewingProductId} from "../utils/LocalStorage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const imageUrls = [
    "https://images-na.ssl-images-amazon.com/images/I/41y0NUBr8BL.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/31AOWcizYvL.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/317ZQtCvFzL.jpg"
];

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px",
        width: "auto",
        overflow: "auto",
        padding: "5px",
    },
    title: {
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "21px",
    },
    container: {
        width: "100%",
        height: "100%",
    },
    item: {
        width: "280px !important",
        maxHeight: "368.8px !important"
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
        SetViewingProductId(JSON.stringify(product));
        history.push("/detail");
    }

    function generateLineOfProducts(keys, products) {
        let data = [];
        if (products.length > 0)
        {
            for (let i = 0; i < products.length; i++) {
                let _imageUrl, _key, _title, _subtitle;
                _imageUrl = _key = _title = _subtitle  = products[i] ;
                let imageUrlArray = [];
                if (keys.imageUrl !== "")
                {
                    imageUrlArray = keys.imageUrl.split(".");
                }
                // else
                // {
                //     imageUrlArray.push(imageUrls[Math.floor(Math.random() * imageUrls.length)])
                // }
                let keyArray = keys.id.split(".");
                let titleArray = keys.title.split(".");
                let subtitleArray = keys.subtitle.split(".");
                for (let val of imageUrlArray)
                {
                    _imageUrl = _imageUrl[val];
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
                        handleCardClick={() => {
                            handleCardClick(products[i])
                        }}
                        />}
                        cardAction={""}
                    />
                );
            }
        }
        return data;

    }
    return (
        <div className={classes.root}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom
                        className={classes.title}>
                {props.lineTitle}
            </Typography>
            <Carousel
                responsive={responsive}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={true}
                className={""}
                containerClass={classes.container}
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={true}
                itemClass={classes.item}
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                slidesToSlide={2}
            >
                {generateLineOfProducts(props.lineKeys ,props.lineOfProducts)}
            </Carousel>
        </div>
    );
}