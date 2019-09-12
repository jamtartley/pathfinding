import React from "react";

import { GeneratorType } from "generator/generators.js";

import RecursiveBacktracker from "view/components/generator/recursive_backtracker.js";

import store from "redux/store.js";
import { changeSearchType } from "redux/actions.js";

export default class AlgorithmSection extends React.Component {
    componentDidMount() {
        $(".algorithm-section").accordion({
            animate: 200,
            active: 0,
            activate: function (event, ui) {
                store.dispatch(changeGeneratorType(ui.newHeader.data("generator")));
            }.bind(this)
        });
    }

    render() {
        let options = store.getState().generators;

        return (
            <div className="algorithm-section">
                <RecursiveBacktracker type={GeneratorType.RECURSIVE_BACKTRACKER} startOpts={options[GeneratorType.RECURSIVE_BACKTRACKER]}/>
            </div>
        );
    }
};
