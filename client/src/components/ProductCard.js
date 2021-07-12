import React from "react"
import {Card, Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "200px", height: "320px"
    },
    image: {
        height: "220px",
        width: "200px"
    },
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical"
    },
    subtitle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
}))
export default function ProductCard(props) {
    const classes = useStyles();
    return (
        <Card raised={true} className={classes.root}>
            <img src={props.imageUrl} alt={altImg} className={classes.image}/>
            <Typography variant={"h5"} component={"h1"} color={"black"} align={"center"} className={classes.title}>
                {
                    props.title
                }
            </Typography>
            <Typography variant={"h6"} component={"h2"} color={"black"} align={"center"}>
                {
                    props.subtitle
                }
            </Typography>
        </Card>
    );
}