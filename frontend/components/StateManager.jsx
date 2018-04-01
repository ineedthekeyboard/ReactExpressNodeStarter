import React, { Component } from 'react';

class StateManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.setAppState = this.setAppState.bind(this);
    }

    setAppState(updater, callback) {
        // newState can be object or function!
        debugger;
        this.setState(updater, () => {
            if (this.props.debug) {
                console.log('setAppState', JSON.stringify(this.state));
            }
            if (callback) {
                callback();
            }
        });
    }
    doesSupportLocalStorage() {
        return (typeof (Storage) !== 'undefined');
    }
    setLocalStorageState(key, data) {
        if (this.doesSupportLocalStorage) {
            let state = JSON.parse(localStorage.getItem('state')) || {};
            state[key] = data;
            localStorage.setItem("state", JSON.stringify(state));
        } else {
            throw new Error("No local storage support");
        }
    }
    getLocalStorageState(key) {
        if (this.doesSupportLocalStorage) {
            let state = JSON.parse(localStorage.getItem('state')) || {};
            return state[key] || undefined;
        } else {
            throw new Error("No local storage support");
        }
    }
    render() {
        return (
            <div className="StateManager">
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        appState: this.state,
                        setAppState: this.setAppState
                    });
                })}
            </div>
        );
    }
}

export default StateManager;