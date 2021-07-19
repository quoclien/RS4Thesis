import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        margin: "auto",
    },
    media: {
        height: "100%",
        // paddingTop: '56.25%', // 16:9
        width: "auto"
    },
    note: {
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 400,
        color: "#242424",
        marginTop: "10px",
        marginRight: "5px"
    },
    title: {
        fontSize: "28px",
        lineHeight: "33px",
        fontWeight: 300,
        color: "#242424",
        marginRight: "5px"
    },
    subtitle: {
        fontSize: "34px",
        lineHeight: "40px",
        fontWeight: 500,
        color: "#000000",
        padding: "5px",
        marginRight: "5px"
    },
    descriptionTitle: {
        fontSize: "20px",
        lineHeight: "21px",
        fontWeight: 400,
        color: "#333333",
        marginRight: "5px"
    },
    description: {
        fontSize: "16px",
        lineHeight: "21px",
        fontWeight: 400,
        color: "#242424",
        marginRight: "5px",
        marginBottom: "10px"
    },
    carouselContainer: {
        textAlign: "center"
    },
}));

export default function ProductDetailCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={5} style={{textAlign: "center"}}>
                    <img src={props.imageUrl} alt={"image of product"} className={classes.media}/>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant={"p"} component={"p"} className={classes.note}>
                        {"Brand: " + props.brand + " | Category: " + props.category}
                    </Typography>
                    <Typography variant={"h1"} component={"h1"} className={classes.title}>
                        {props.title}
                    </Typography>
                    <Typography variant={"h2"} component={"h3"} className={classes.subtitle}>
                        {props.subtitle}
                    </Typography>
                    <div style={{paddingTop: "10px"}}>
                        <Typography variant={"h5"} component={"h6"} className={classes.descriptionTitle}>
                            Description:
                        </Typography>
                        <Typography variant={"p"} component={"p"} className={classes.description}>
                            {props.description}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Card>
    );
}