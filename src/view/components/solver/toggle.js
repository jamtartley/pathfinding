import React from "react";

export default class Toggle extends React.Component {
    onChange(e) {
    }

    render() {
        return (
            <React.Fragment>
                <label>
                    <input type="checkbox" value={this.props.value} name={this.props.value} onChange={this.onChange} defaultChecked={this.props.defaultChecked}/>
                    {this.props.text}
                </label>
            </React.Fragment>
        );
    }
}

