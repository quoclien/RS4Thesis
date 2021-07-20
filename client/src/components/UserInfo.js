import {Avatar, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    root:{
        marginLeft: "35%",
        marginRight: "35%"
    },
    flexParent: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: "column wrap",
        marginTop: "80px",
        marginBottom: "10px",
        marginRight: "20px",
        marginLeft: "20px",
    },
    flexChild: {
        marginTop: "5px",
        marginBottom: "5px"
    },
    flexAvatar: {
        margin: "auto"
    },
    bigAvatar: {
        width: theme.spacing(9),
        height: theme.spacing(9)
    },
    info:{
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "15px",
        color: "#333333"
    }
}))

export default function UserInfo(props) {
    const classes = useStyle();
    const userInfo = props.userInfo;
    return (
        <Paper variant="outlined" className={classes.root}>
            <div className={classes.flexParent}>
                <div className={classes.flexAvatar}>
                    <Avatar alt={"Avatar of " + userInfo.username} src={userInfo.avatar} className={classes.bigAvatar}/>
                </div>
                <div className={classes.flexChild}>
                    <Typography variant={"h6"} component={"p"} className={classes.info}>
                        {"Name: " + userInfo.name}
                    </Typography>
                </div>
                <div className={classes.flexChild}>
                    <Typography variant={"h6"} component={"p"} className={classes.info}>
                        {"Email: " + userInfo.email}
                    </Typography>
                </div>
                <div className={classes.flexChild}>
                    <Typography variant={"h6"} component={"p"} className={classes.info}>
                        {"Age: " + userInfo.age}
                    </Typography>
                </div>
                <div className={classes.flexChild}>
                    <Typography variant={"h6"} component={"p"} className={classes.info}>
                        {"Gender (M/F): " + userInfo.gender}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}