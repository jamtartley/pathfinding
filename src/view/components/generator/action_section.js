import React from "react";

export default class ActionSection extends React.Component {
    handleGenerate() {
        this.props.controller.generateMaze();
    }

    render() {
        return (
            <div className="action-section">
                <button id="generate" className="primary-action-button" onClick={this.handleGenerate.bind(this)}>Generate</button>
            </div>
        )
    }
};
