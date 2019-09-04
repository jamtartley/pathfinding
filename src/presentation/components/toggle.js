import React from "react";

import { changeAllowDiag } from "../../redux/actions.js";
import store from "../../redux/store.js";

export default class Toggle extends React.Component {
    onChange(e) {
        store.dispatch(changeAllowDiag(e.currentTarget.checked));
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

