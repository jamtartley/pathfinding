import React from "react";
import ActionSection from "./action_section.js";
import HeaderSection from "../header_section.js";
import SettingsSection from "./settings_section.js";
import AlgorithmSection from "./algorithm_section.js";

export default class SolverPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderSection title={"Solver"}/>
                <AlgorithmSection controller={this.props.controller}/>
                <SettingsSection controller={this.props.controller}/>
                <ActionSection controller={this.props.controller}/>
            </React.Fragment>
        );
    }
};
