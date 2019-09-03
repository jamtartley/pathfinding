import React from "react";
import AStar from "./a_star.js";
import Dijkstra from "./dijkstra.js";

import { SearchType } from "../controller.js";

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("#search-panel").accordion({
            animate: 200,
            activate: function (event, ui) {
                switch (ui.newHeader.data("search")) {
                    case "a-star":
                        this.props.controller.searchType = SearchType.ASTAR;
                        return;
                    case "dijkstra":
                        this.props.controller.searchType = SearchType.DIJKSTRA;
                        return;
                }
            }.bind(this)
        });
    }

    render() {
        return (
            <div id="search-panel">
                <AStar />
                <Dijkstra />
            </div>
        );
    }
};
