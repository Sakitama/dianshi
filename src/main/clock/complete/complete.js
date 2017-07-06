import React, {Component} from 'react';
import complete from './ic_movie_pay_success.png';

class Complete extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.hiddenClock();
            setTimeout(() => {
                this.props.showMessage();
            }, 200);
        }, 1000)
    }

    render() {
        return (
            <div className="h100 df fdc jcc aic">
                <img style={{
                    width: '30%'
                }} src={complete} alt="complete" />
                <p style={{
                    marginTop: '30px'
                }} className="cfff">欢迎回来！</p>
            </div>
        )
    }
}

export default Complete;