import React from "react";

export default class ActionSection extends React.Component {
    handleSearch() {
        this.props.controller.search();
    }

    handleRandomiseEnds() {
        this.props.controller.randomiseStartAndEnd();
    }

    render() {
        return (
            <div id="action-section">
                <button id="search" className="search-button" onClick={this.handleSearch.bind(this)}>Search</button>
                <button id="randomise-ends" onClick={this.handleRandomiseEnds.bind(this)}>Randomise end points</button>
            </div>
        )
    }
};
