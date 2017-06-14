import React, {Component} from 'react';
import style from './error.css';
import img from './01.png';
import circle from './circle.svg';

class Error extends Component {
    click = () => {
        if (this.props.tryListFirstFetchData) {
            this.props.tryListFirstFetchData();
        } else if (this.props.tryAppFetchData) {
            this.props.tryAppFetchData();
        } else {
            return null;
        }
    };

    render() {
        return (
            <div className={`${style.error} h100 df fdc aic jcc`}>
                <img src={img} alt="failed" />
                <span className={style.text}>{this.props.text}</span>
                {this.props.shouldTry === 'yes' ? (
                    <div onClick={this.click} className="df aic jcc">
                        <img className={style.circle} src={circle} alt="circle" />
                        <span className={style.try}>点我重试一次</span>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Error;
