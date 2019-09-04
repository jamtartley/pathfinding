import React from "react";
import ActionPanel from "./action_panel.js";
import SearchPanel from "./search_panel.js";

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <SearchPanel controller={this.props.controller}/>
                <ActionPanel controller={this.props.controller}/>
            </React.Fragment>
        );
    }
};
