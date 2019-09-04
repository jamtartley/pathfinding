import React from "react";

import Toggle from "./toggle.js";

export default class Dijkstra extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="section-header" data-search={this.props.type}>Dijkstra</h3>
                <div className="section-inner">
                    <header>
                        Options
                    </header>
                    <Toggle value={"shouldAllowDiag"} text={"Should allow diagonal"} defaultChecked={this.props.startOpts.shouldAllowDiag}/>
                </div>
            </React.Fragment>
        );
    }
}
