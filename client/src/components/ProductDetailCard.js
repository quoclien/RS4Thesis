import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {colors, Grid} from "@material-ui/core";
import Carousel from "react-multi-carousel";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        margin: "auto",
    },
    media: {
        height: "448px",
        // paddingTop: '56.25%', // 16:9
        width: "auto"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    note:{
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 400,
        color: "#242424"
    },
    title:{
        fontSize: "28px",
        lineHeight: "33px",
        fontWeight: 300,
        color: "#242424"
    },
    subtitle:{
        fontSize: "34px",
        lineHeight: "40px",
        fontWeight: 500,
        color: "#000000",
        padding: "5px"
    },
    descriptionTitle:{
        fontSize: "20px",
        lineHeight: "21px",
        fontWeight: 400,
        color: "#333333"
    },
    description:{
        fontSize: "16px",
        lineHeight: "21px",
        fontWeight: 400,
        color: "#242424"
    },
    carouselContainer: {
        textAlign: "center"
    }

}));

export default function ProductDetailCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function generateImageList()
    {
        let data =[];
        data.push(
            <img src={props.imageUrl} alt={"image of product"} className={classes.media}/>
        );
        return data;
    }

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    {generateImageList()}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"p"} component={"p"} className={classes.note}>
                        {"Brand: " + props.brand +" | Category: " + props.category}
                    </Typography>
                    <Typography variant={"h1"} component={"h1"} className={classes.title}>
                        {props.title}
                    </Typography>
                    <Typography variant={"h2"} component={"h3"} className={classes.subtitle}>
                        {props.subtitle}
                    </Typography>
                    <div style={{paddingTop: "10px"}}>
                        <Typography variant={"h5"} component={"h6"} className={""}>
                            Description:
                        </Typography>
                        <Typography variant={"p"} component={"p"} className={classes.description}>
                            {props.description}
                        </Typography>
                        {/*<Typography variant={"p"} component={"p"} className={classes.description}>*/}
                        {/*    Gift Card has no fees and no expiration date*/}
                        {/*</Typography>*/}
                        {/*<Typography variant={"p"} component={"p"} className={classes.description}>*/}
                        {/*    No returns and no refunds on Gift Cards*/}
                        {/*</Typography>*/}
                    </div>
                    {/*<div style={{paddingTop: "10px"}}>*/}
                    {/*    <Typography variant={"h5"} component={"h6"} className={""}>*/}
                    {/*        Details:*/}
                    {/*    </Typography>*/}
                    {/*    <Typography variant={"p"} component={"p"} className={classes.description}>*/}
                    {/*        <b>Shipping Weight:</b> 1.6 pounds*/}
                    {/*    </Typography>*/}
                    {/*    <Typography variant={"p"} component={"p"} className={classes.description}>*/}
                    {/*        <b>Domestic Shipping:</b> Item can be shipped within U.S.*/}
                    {/*    </Typography>*/}
                    {/*    <Typography variant={"p"} component={"p"} className={classes.description}>*/}
                    {/*        <b>International Shipping:</b> This item is not eligible for international shipping.*/}
                    {/*    </Typography>*/}
                    {/*</div>*/}
                </Grid>
            </Grid>
        </Card>
    );
}