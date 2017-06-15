import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="h100 df jcc aic">
                <div className="spinner" />
            </div>
        );
    }
}

export default Loading;

