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
    }
}))

export default function UserInfo(props) {
    const classes = useStyle();
    return (
        <div className={classes.flexParent}>
            <div className={classes.flexChild}>
                <Avatar alt="Guest" src={"../assets/images/reactlogo192.png"} className={classes.bigAvatar}></Avatar>
            </div>
            <div className={classes.flexChild}>
                <Typography variant={"h6"} component={"p"}>
                    {props.userID}
                </Typography>
            </div>
        </div>
    );
}