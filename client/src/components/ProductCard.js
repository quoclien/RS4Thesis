import React from "react"
import {Card, Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";

export default function ProductCard(props) {
    return (
        <Card raised={true}>
            <img src={altImg} alt={altImg}/>
            <Typography variant={"h5"} component={"h2"} color={"black"} align={"center"}>
                {
                    "Product " + props.index
                }
            </Typography>
            <Typography variant={"p"} component={"p"} color={"black"} align={"center"}>
                {
                    "Author of product " + props.index
                }
            </Typography>
        </Card>
    );
}