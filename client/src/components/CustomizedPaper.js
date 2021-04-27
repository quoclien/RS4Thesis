import React from "react"
import {Button, Grid, Paper} from "@material-ui/core";
import CustomizedCard from "./CustomizedCard";
export default function CustomizedPaper(props){
    return (
        <Paper
            variant={"outlined"}
            className={
                {height: "200px"}
            }
        >
            <Grid container justify={"space-around"}>
                <Grid item>
                    <CustomizedCard
                        cardContent={"Hello world"}
                        cardAction={""}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}