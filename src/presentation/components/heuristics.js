import React from "react";

import { HeuristicType } from "../../logic/heuristics.js";
import { changeCurrentHeuristic } from "../../redux/actions.js";
import store from "../../redux/store.js";

export default class Heuristics extends React.Component {
    onHeuristicChange(e) {
        store.dispatch(changeCurrentHeuristic(e.currentTarget.value));
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
            <header>
                Heuristic
            </header>
                { options }
            </form>
        );
    }
}
