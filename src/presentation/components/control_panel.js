import React from "react";
import ActionPanel from "./action_panel.js";

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <hr/>
                <ActionPanel controller={this.props.controller}/>
            </React.Fragment>
        );
    }
};
