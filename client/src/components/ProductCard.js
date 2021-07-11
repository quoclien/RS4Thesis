import React from "react"
import {Card, Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";

export default function ProductCard(props) {
    return (
        <Card raised={true} style={{width: "200px", height: "320px"}}>
            <img src={props.imageUrl} alt={altImg} className={{  height: "50px",
                width: "50px"}}/>
            <Typography variant={"h5"} component={"h2"} color={"black"} align={"center"}>
                {
                    props.title
                }
            </Typography>
            <Typography variant={"p"} component={"p"} color={"black"} align={"center"}>
                {
                    props.subtitle
                }
            </Typography>
        </Card>
    );
}