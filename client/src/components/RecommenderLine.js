import React from 'react'
import {Container, Grid, Typography} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";

export default function RecommenderLine(props){

function generateLineOfProducts(products) {
    let data = [];
    for (let i = 0; i < Object.keys(products).length; i++)
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
    console.log(products.length);
    return data;

}
    return (
        <Container>
            <div>
                <Typography component={"h2"} variant={"h5"} className={{fontFamily: "Arial", fontWeight: "bold", fontSize: "30"}}>
                    {props.lineTitle}
                </Typography>
            </div>
            <Grid container>
                {generateLineOfProducts(props.lineOfProducts)}
            </Grid>
        </Container>
    );
}