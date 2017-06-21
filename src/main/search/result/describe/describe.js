import React, { Component } from 'react';

class Describe extends Component {
    render() {
        return (
            <div style={{
                height: '50px'
            }} className="df jcc aic">
                <span style={{
                    fontSize: '12px'
                }} className="cfff">{this.props.text}</span>
            </div>
        )
    }
}

export default Describe;
