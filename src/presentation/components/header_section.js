import React from "react";

export default class HeaderSection extends React.Component {
    render() {
        return (
            <div className="header-section">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
};
