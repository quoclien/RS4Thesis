import React from "react"
import {MenuItem, Select} from "@material-ui/core";

export default class CustomizedSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
        this.props.handleChange(event);
    }

    render() {
        return(
            <Select
                labelId={this.props.labelId}
                id={this.props.id}
                value={this.state.value}
                onChange={this.handleChange}
            >
                {
                    this.props.menuItems.map(item => {
                        return <MenuItem value={item.value}>{item.label}</MenuItem>
                    })
                }
            </Select>
        );
    }
}