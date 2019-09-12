import React from "react";

import HeaderSection from "view/components/header_section.js";

import ActionSection from "view/components/generator/action_section.js";
import AlgorithmSection from "view/components/generator/algorithm_section.js";

export default class GeneratorPanel extends React.Component {
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
