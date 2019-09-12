import React from "react";
import ActionSection from "./action_section.js";
import HeaderSection from "../header_section.js";

export default class GeneratorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderSection title={"Generator"}/>
                <ActionSection controller={this.props.controller}/>
            </React.Fragment>
        );
    }
};
