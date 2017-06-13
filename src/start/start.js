import React, {Component} from 'react';
import style from './start.css';
import i1 from './1.jpg';
import i2 from './2.jpg';
import i3 from './3.jpg';
import i4 from './4.jpg';

const iList = [i1, i2, i3, i4];

class Start extends Component {
    state = {
        ratio: 1,
        index: Math.floor(Math.random() * 4)
    };

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState(prevState => ({
                ratio: prevState.ratio + 0.001
            }));
        }, 17);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        let styleObj = {
                backgroundImage: `url(${iList[this.state.index]})`,
                transform: `scale(${this.state.ratio})`
            };
        return (
            <div className={`${style.start} h100 pr df aic jcc oh`}>
                <div style={styleObj} className={`${style.start} pa w100 h100 brnr bsc`} />
                <div className="mask pa w100 h100" />
                <div className={`${style.logo} cfff`}>- 点视 -</div>
            </div>
        );
    }
}

export default Start;
