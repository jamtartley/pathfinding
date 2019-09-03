import React from "react";

export default class ActionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch() {
        this.props.controller.search();
    }

    render() {
        return (
            <div id="action-panel">
                <button id="search" onClick={this.handleSearch.bind(this)}>Search</button>
            </div>
        )
    }
};
