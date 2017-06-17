import React, {Component} from 'react';
import loading from './loading.svg';

class Hot extends Component {
    render() {
        return (
            <div style={{
                height: '50px'
            }} className="df jcc aic">
                <div style={{
                    width: '24px',
                    height: '24px'
                }} className="rotate">
                    <img className="w100" src={loading} alt="loading" />
                </div>
            </div>
        )
    }
}

export default Hot;