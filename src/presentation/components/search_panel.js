import React from "react";
import AStar from "./a_star.js";
import Dijkstra from "./dijkstra.js";

import { SearchType } from "../controller.js";

export default class SearchPanel extends React.Component {
    componentDidMount() {
        $("#search-panel").accordion({
            animate: 200,
            active: 0,
            activate: function (event, ui) {
                this.props.controller.searchType = ui.newHeader.data("search");
            }.bind(this)
        });
    }

    render() {
        return (
            <div id="search-panel">
                <AStar controller={this.props.controller} type={SearchType.ASTAR}/>
                <Dijkstra controller={this.props.controller} type={SearchType.DIJKSTRA}/>
            </div>
        );
    }
};
