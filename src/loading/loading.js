import React, { Component } from 'react';
import style from './loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="h100 df fdc jcc aic">
                <div className="spinner" />
                <span className={`${style.text} cfff`}>拼命加载中...</span>
            </div>
        );
    }
}

export default Loading;

