import React from 'react'
import {Grid, Typography, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px",
        width: "fit-content",
        padding: "5px",
    }
}))

export default function ProductLine(props) {
    const classes = useStyles();

    function generateLineOfProducts(keys, products) {
        let data = [];
        let imageString = true;
        for (let i = 0; i < products.length; i++) {
            data.push(
                <Grid item key={i}>
                    <CustomizedCard
                        cardContent={<ProductCard
                            imageUrl={products[i][keys.imageUrl]}
                            key={products[i][keys.id]}
                            title={products[i][keys.title]}
                            subtitle={products[i][keys.subtitle]}
                        ></ProductCard>}
                        cardAction={""}
                    />
                </Grid>
            );
        }
        return data;

    }
    return (
        <Paper className={classes.root}>
            <Typography component="h2" variant="h5" color="primary" gutterBottom
                        className={{fontFamily: "Arial", fontWeight: "bold", fontSize: "30"}}>
                {props.lineTitle}
            </Typography>
            <Grid container>
                {generateLineOfProducts(props.lineKeys ,props.lineOfProducts)}
            </Grid>
        </Paper>
    );
}