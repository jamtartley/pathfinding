import React from "react";

import Heuristics from "./heuristics.js";
import { SearchType } from "../controller.js";

import Toggle from "./toggle.js";

export default class AStar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="section-header" data-search={this.props.type}>A*</h3>
                <div className="section-inner">
                    <Heuristics initialHeuristic={this.props.startOpts.heuristic}/>
                    <header>
                        Options
                    </header>
                    <Toggle value={"shouldAllowDiag"} text={"Should allow diagonal"} defaultChecked={this.props.startOpts.shouldAllowDiag}/>
                </div>
            </React.Fragment>
        );
    }
}
