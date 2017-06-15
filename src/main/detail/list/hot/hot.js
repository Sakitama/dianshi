import React, {Component} from 'react';
import loading from './loading.svg';
import style from './hot.css';

class Hot extends Component {
    render() {
        return (
            <div className={`${style.loading} df aic jcc`}>
                <div className={`${style.wrapper} rotate`}>
                    <img className="w100" src={loading} alt="loading" />
                </div>
            </div>
        )
    }
}

export default Hot;