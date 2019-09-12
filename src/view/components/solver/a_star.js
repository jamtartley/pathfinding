import React from "react";

import Heuristics from "view/components/solver/heuristics.js";
import { SearchType } from "solver/solvers.js";

export default class AStar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="section-header" data-search={this.props.type}>A*</h3>
                <div className="section-inner">
                    <Heuristics initialHeuristic={this.props.startOpts.heuristic.type}/>
                </div>
            </React.Fragment>
        );
    }
}
