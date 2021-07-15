import React from "react"
import {Card, CardActionArea, Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer",
        textAlign: "center",
        padding: "0 !important",
    },
    image: {
        height: "240px",
        width: "240px",
    },
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 400,
        color: "#242424"
    },
    subtitle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "17px",
        lineHeight: "24px",
        fontWeight: 500,
        color: "#242424"
    }
}))
export default function ProductCard(props) {
    const classes = useStyles();
    return (
        <Card raised={true} className={classes.root} onClick={props.handleCardClick}>
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