import {Avatar, Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) =>({
    flexParent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: "column wrap",
        marginTop: "80px"
    },
    flexChild: {

    }
}))

export default function UserInfo(props){
    const classes = useStyle();
    return(
        <div className={classes.flexParent}>
            <div className={classes.flexChild}>
                <Avatar alt="Profile avatar" src={"../assets/images/reactlogo192.png"}></Avatar>
            </div>
            <div className={classes.flexChild}>
                <Typography variant={"h3"} component={"p"}>
                    Name and age
                </Typography>
            </div>
        </div>
    );
}