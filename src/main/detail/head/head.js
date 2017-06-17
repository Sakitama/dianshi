import React, { Component } from 'react';
import arrow from './arrow.svg';

class Head extends Component {
    detailBackToMain = () => {
        this.props.detailBackToMain();
    };

    render() {
        return (
            <div style={{
                fontSize: '12px',
                height: '8%'
            }} className="df">
                <div onClick={this.detailBackToMain} style={{
                    paddingLeft: '1em',
                    flex: '1'
                }} className="df aic">
                    <img style={{
                        width: '2em'
                    }} src={arrow} alt="arrow-icon" />
                </div>
                <div style={{
                    flex: '1'
                }} className="df jcc aic">
                    <span className="cfff">{this.props.channelName}</span>
                </div>
                <div style={{
                    flex: '1'
                }} />
            </div>
        );
    }
}

export default Head;
