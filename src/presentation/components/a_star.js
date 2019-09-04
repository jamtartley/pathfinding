import React from "react";

import Heuristics from "./heuristics.js";

export default class AStar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="section-header" data-search={this.props.type}>A*</h3>
                <div className="section-inner">
                    <Heuristics controller={this.props.controller}/>
                </div>
            </React.Fragment>
        );
    }
}
