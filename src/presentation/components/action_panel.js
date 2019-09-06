import React from "react";

export default class ActionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch() {
        this.props.controller.search();
    }

    handleRandomiseEnds() {
        this.props.controller.randomiseStartAndEnd();
    }

    render() {
        return (
            <div id="action-panel">
                <button id="search" className="search-button" onClick={this.handleSearch.bind(this)}>Search</button>
                <button id="randomise-ends" onClick={this.handleRandomiseEnds.bind(this)}>Randomise end points</button>
            </div>
        )
    }
};
