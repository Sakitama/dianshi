import React, {Component} from 'react';
import wait from './ic_bangumi_timeline_first_dialog.png';

class Do extends Component {
    state = {
        str: '00 : 60'
    };

    time = 59;

    timer = null;

    componentDidMount() {
        this.timer = setInterval(() => {
            let min = this.time / 60 >> 0;
            let second = this.time % 60;
            min = min < 10 ? `0${min}` : min;
            second = second < 10 ? `0${second}` : second;
            this.setState({
                str: `${min} : ${second}`
            });
            if (this.time === 0) {
                clearInterval(this.timer);
                this.props.showComplete();
                return;
            }
            this.time--;
        }, 1000);
    }

    render() {
        return (
            <div className="h100 df fdc jcc aic">
                <img style={{
                    width: '30%',
                    marginBottom: '30px'
                }} src={wait} alt="wait" />
                <p>{this.state.str}</p>
            </div>
        )
    }
}

export default Do;