import React from "react";
import HeaderSection from "../header_section.js";

export default class GeneratorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderSection title={"Generator"}/>
            </React.Fragment>
        );
    }
};

