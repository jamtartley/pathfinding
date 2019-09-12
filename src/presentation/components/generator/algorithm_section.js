import React from "react";
import RecursiveBacktracker from "./recursive_backtracker.js";

import { GeneratorType } from "../../../generators/generators.js";

import store from "../../../redux/store.js";
import { changeSearchType } from "../../../redux/actions.js";

export default class AlgorithmSection extends React.Component {
    componentDidMount() {
        $(".algorithm-section").accordion({
            animate: 200,
            active: 0,
            activate: function (event, ui) {
                store.dispatch(changeSearchType(ui.newHeader.data("generator")));
            }.bind(this)
        });
    }

    render() {
        let options = store.getState();

        return (
            <div className="algorithm-section">
                <RecursiveBacktracker type={GeneratorType.RECURSIVE_BACKTRACKER} startOpts={options[GeneratorType.RECURSIVE_BACKTRACKER]}/>
            </div>
        );
    }
};

