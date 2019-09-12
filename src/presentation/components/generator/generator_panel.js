import React from "react";
import ActionSection from "./action_section.js";
import AlgorithmSection from "./algorithm_section.js";
import HeaderSection from "../header_section.js";

export default class GeneratorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderSection title={"Generator"}/>
                <AlgorithmSection controller={this.props.controller}/>
                <ActionSection controller={this.props.controller}/>
            </React.Fragment>
        );
    }
};
