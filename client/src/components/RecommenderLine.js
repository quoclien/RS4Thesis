import React from 'react'
import {Container, Grid, Typography} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";

export default function RecommenderLine(props){

function generateLineOfProducts(products) {
    let data = [];
    for (let i = 0; i < products.length; i++)
    {
        data.push(
            <Grid item>
                <CustomizedCard
                    cardContent={<ProductCard
                        imageSrc={'../assets/images/reactlogo192.png'}
                        index ={i}
                    ></ProductCard>}
                    cardAction={""}
                />
            </Grid>
        );
    }
    return data;

}
    return (
        <Grid container>
            <Grid item={12}>
                <Typography component={"h1"} variant={"h6"}>
                    {props.lineTitle}
                </Typography>
            </Grid>
            <Grid item={13}>
                {generateLineOfProducts(props.lineOfProducts)}
            </Grid>
        </Grid>
    );
}