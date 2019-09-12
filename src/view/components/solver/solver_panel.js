import React from "react";

import HeaderSection from "view/components/header_section.js";


import ActionSection from "view/components/solver/action_section.js";
import SettingsSection from "view/components/solver/settings_section.js";
import AlgorithmSection from "view/components/solver/algorithm_section.js";

export default class SolverPanel extends React.Component {
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
