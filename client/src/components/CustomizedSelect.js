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
    }

    render() {
        <Select
            labelId={this.props.labelId}
            id={this.props.id}
            value={this.state.value}
            onChange={this.handleChange}
        >
            {
                this.props.menuItems.forEach(item => {
                    return <MenuItem value={this.props.menuItems[item].value}>{this.props.menuItems[item].label}</MenuItem>
                })
            }
        </Select>
    }
}