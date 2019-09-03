import React from "react";

import { HeuristicType } from "../../logic/heuristics.js";

export default class Heuristics extends React.Component {
    onHeuristicChange(e) {
        this.props.controller.heuristicType = e.currentTarget.value;
    }

    render() {
        let options = Object.keys(HeuristicType).map(key =>
            <label key={key}>
                <input type="radio" value={HeuristicType[key]} name="heuristic" onChange={this.onHeuristicChange.bind(this)}/>
                {HeuristicType[key]}
            </label>
        );

        return (
            <form name="heuristics-selection">
                { options }
            </form>
        );
    }
}
