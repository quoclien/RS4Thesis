import React from "react"
import {Typography} from "@material-ui/core";
import altImg from "../assets/images/reactlogo192.png";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer",
        textAlign: "center"
    },
    image: {
        height: "250px",
        width: "auto",
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
        color: "#242424",
        padding: "2px 1px 2px 1px"
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
        <div className={classes.root} onClick={props.handleCardClick}>
            <img
                src={props.imageUrl ? props.imageUrl : "https://images-na.ssl-images-amazon.com/images/I/41fby%2BUjOJL.jpg"}
                alt={altImg} className={classes.image}/>
            <Typography variant={"h5"} component={"h1"} color={"black"} align={"center"} className={classes.title}>
                {/*{*/}
                {/*    props.title*/}
                {/*}*/}
                {props.title ? props.title : "Amazon.com $50 Gift Cards, Pack of 50 (Old Version) (Classic White Card Design)"}
            </Typography>
            <Typography variant={"h6"} component={"h2"} color={"black"} align={"center"}>
                {
                    props.subtitle ? props.subtitle : "$1,250.00"
                }
            </Typography>
        </div>
    );
}