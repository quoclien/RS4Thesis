import React from 'react'
import {Grid, Typography, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px",
        width: "auto",
        overflow: "auto",
        padding: "5px",
    },
    container: {
        width: "max-content",
    }
}))

export default function ProductLine(props) {
    const classes = useStyles();

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
                    <Grid item key={i}>
                        <CustomizedCard
                            cardContent={<ProductCard
                                imageUrl={_imageUrl}
                                key={_key}
                                title={_title}
                                subtitle={_subtitle}
                            ></ProductCard>}
                            cardAction={""}
                        />
                    </Grid>
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
            <Grid container className={classes.container} gutter={24} justify='center'>
                {generateLineOfProducts(props.lineKeys ,props.lineOfProducts)}
            </Grid>
        </Paper>
    );
}