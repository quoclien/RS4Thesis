import React, {useState} from "react"
import {Card, CardActions, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {

    },
    content: {
        padding: "0 !important",
    }
})

export default function CustomizedCard(props) {
    const [elevation, setElevation] = useState(0);
    const [raised, setRaised] = useState(false);
    const classes = useStyles();
    function onMouseOver()
    {
        setElevation(5);
        setRaised(true);
    }
    function onMouseOut() {
        setElevation(0);
        setRaised(false);
    }
    return (
        <Card className={classes.root} elevation={elevation} onMouseOver={onMouseOver} onMouseOut={onMouseOut} raised={raised}>
            <CardContent className={classes.content}>
                {props.cardContent}
            </CardContent>
            <CardActions>
                {props.cardAction ? props.cardAction : ""}
            </CardActions>
        </Card>
    );
}
