import React from "react";
import AStar from "./a_star.js";

import { SearchType } from "../controller.js";

import store from "../../redux/store.js";
import { changeSearchType } from "../../redux/actions.js";

export default class SearchPanel extends React.Component {
    componentDidMount() {
        $("#search-panel").accordion({
            animate: 200,
            active: 0,
            activate: function (event, ui) {
                store.dispatch(changeSearchType(ui.newHeader.data("search")));
            }.bind(this)
        });
    }

    render() {
        let options = store.getState();

        return (
            <div id="search-panel">
                <AStar type={SearchType.ASTAR} startOpts={options[SearchType.ASTAR]}/>
            </div>
        );
    }
};
