import React from "react";

import Heuristics from "./heuristics.js";
import { SearchType } from "../controller.js";

import Toggle from "./toggle.js";

export default class BestFirst extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="section-header" data-search={this.props.type}>Best First</h3>
                <div className="section-inner">
                    <Heuristics initialHeuristic={this.props.startOpts.heuristic.type}/>
                    <header>
                        Options
                    </header>
                    <Toggle value={"canMoveDiag"} text={"Can move diagonally"} defaultChecked={this.props.startOpts.canMoveDiag}/>
                </div>
            </React.Fragment>
        );
    }
}
