import {Avatar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    flexParent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column wrap",
        marginTop: "80px",
        marginBottom: "10px"
    },
    flexChild: {},
    bigAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    name:{

    }
}))

export default function UserInfo(props) {
    const classes = useStyle();
    const userInfo = props.userInfo;
    return (
        <div className={classes.flexParent}>
            <div className={classes.flexChild}>
                <Avatar alt={"Avatar of " + userInfo.username} src={userInfo.avatar} className={classes.bigAvatar}/>
            </div>
            <div className={classes.flexChild}>
                <Typography variant={"h6"} component={"p"} className={classes.name}>
                    {userInfo.name}
                </Typography>
            </div>
        </div>
    );
}