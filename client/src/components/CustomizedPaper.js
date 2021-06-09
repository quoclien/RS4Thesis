import React from "react"
import {Grid, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";

function generateFakeData(n) {
    let data = [];
    for (let i = 0; i < n; i++) {
        data.push(
            <Grid item>
                <CustomizedCard
                    cardContent={<ProductCard
                        imageSrc={'../assets/images/reactlogo192.png'}
                        index={i}
                    ></ProductCard>}
                    cardAction={""}
                />
            </Grid>
        );
    }
    return data;
}

export default function CustomizedPaper(props) {
    return (
        <Paper
            // variant={"outlined"}
            className={
                {height: "200px"}
            }
            elevation={0}
        >
            <Grid container justify={"space-around"}>
                {
                    generateFakeData(10)
                }
            </Grid>
        </Paper>
    );
}