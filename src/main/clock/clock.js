import React, {Component} from 'react';
import style from './clock.css';
import charge from './ic_charge_power.png';
import Do from './do/do';
import Complete from './complete/complete';

const MESSAGE = 0;
const EXERCISE = 1;
const COMPLETE = 2;

class Clock extends Component {
    state = {
        showClock: false,
        flag: MESSAGE
    };

    time = 0;

    timer = null;

    showMessage = () => {
        this.setState({
            flag: MESSAGE
        });
    };

    hiddenClock = () => {
        this.timer = setInterval(() => {
            if (this.time === 1800) {
                clearInterval(this.timer);
                this.time = 0;
                this.setState({
                    showClock: true
                });
                return;
            }
            this.time++;
        }, 1000);
        this.setState({
            showClock: false
        });
    };

    showDo = () => {
        this.setState({
            flag: EXERCISE
        });
    };

    showComplete = () => {
        this.setState({
            flag: COMPLETE
        });
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.time === 1800) {
                clearInterval(this.timer);
                this.time = 0;
                this.setState({
                    showClock: true
                });
                return;
            }
            this.time++;
        }, 1000);
    }

    render() {
        let content = null;
        if (this.state.flag === MESSAGE) {
            content = (
                <div className="h100 df fdc jcc aic">
                    <img style={{
                        width: '30%'
                    }} src={charge} alt="charge" />
                    <p style={{
                        width: '50%',
                        marginTop: '30px'
                    }}>感谢您对小点的支持，但为了保护您的视力，请做个眼保健擦，给您的眼睛充充电！</p>
                    <div onClick={this.showDo} style={{
                        width: '50%',
                        backgroundColor: '#00e06e',
                        padding: '10px 0',
                        borderRadius: '10px',
                        margin: '30px 0'
                    }} className="tac">好啦，我去！</div>
                    <div onClick={this.hiddenClock} style={{
                        width: '50%',
                        backgroundColor: '#fa3443',
                        padding: '10px 0',
                        borderRadius: '10px'
                    }} className="tac">我感觉良好！</div>
                </div>
            );
        } else if (this.state.flag === EXERCISE) {
            content = (
                <Do showComplete={this.showComplete} />
            );
        } else if (this.state.flag === COMPLETE) {
            content = (
                <Complete showMessage={this.showMessage} hiddenClock={this.hiddenClock} />
            );
        }
        return (
            <div className={`${style.clock} cfff pa w100 h100 ${this.state.showClock ? style.show : style.hidden}`}>
                {content}
            </div>
        )
    }
}

export default Clock;