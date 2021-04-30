import React from "react"
import {Container, Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";

export default function ProductCard(props){
    return(
        <Container>
            <img src={altImg} alt={altImg}/>
            <Typography variant={"h5"} component={"h2"} color={"black"} align={"center"}>
                {
                    "Item " + props.index
                }
            </Typography>
            <Typography variant={"p"} component={"p"} color={"black"} align={"center"}>
                {
                    "Description of item " + props.index
                }
            </Typography>
        </Container>
    );
}