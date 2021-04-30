import React, {useState} from "react"
import {Card, CardActions, CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
})

export default function CustomizedCard(props){
    const classes = useState();
    return(
        <Card className={classes.root} elevation={0}>
        <CardContent>
            {props.cardContent}
        </CardContent>
            <CardActions>
                {props.cardAction ? props.cardAction : ""}
            </CardActions>
        </Card>
    );
}
