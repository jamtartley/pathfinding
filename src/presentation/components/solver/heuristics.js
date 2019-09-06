import React from "react";

import { HeuristicType } from "../../../logic/heuristics.js";
import { changeCurrentHeuristic } from "../../../redux/actions.js";
import store from "../../../redux/store.js";

export default class Heuristics extends React.Component {
    componentDidMount() {
        let radios = $("form[name='heuristics-selection'] input[type='radio']");
        radios.each(function(i, el) {
            $(el).change(function() {
                store.dispatch(changeCurrentHeuristic(el.value));
            });
        });
    }

    toDisplay(raw) {
        return raw.charAt(0).toUpperCase() + raw.slice(1);
    }

    render() {
        let options = Object.keys(HeuristicType).map(key =>
            <label key={key}>
                <input type="radio" value={HeuristicType[key]} name="heuristic" defaultChecked={HeuristicType[key]===this.props.initialHeuristic}/>
                {this.toDisplay(HeuristicType[key])}
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
