import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CustomizedSnackbar(props){
    return(
        <CustomizedSnackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </CustomizedSnackbar>
    );
}