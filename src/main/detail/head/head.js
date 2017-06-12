import React, { Component } from 'react';
import style from './head.css';
import arrow from './arrow.svg';

class Head extends Component {
    detailBackToMain = () => {
        this.props.detailBackToMain();
    };

    render() {
        return (
            <div className={`${style.head} df`}>
                <div onClick={this.detailBackToMain} className={`${style.arrow} ${style.btn} aic df`}>
                    <img className={style.icon} src={arrow} alt="arrow-icon" />
                </div>
                <div className={`${style.btn} aic df jcc`}>
                    <span className="cfff">{this.props.channelName}</span>
                </div>
                <div className={style.btn} />
            </div>
        );
    }
}

export default Head;
