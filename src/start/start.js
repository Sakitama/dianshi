import React, {Component} from 'react';
import style from './start.css';
import i1 from './1.jpg';
import i2 from './2.jpg';
import i3 from './3.jpg';
import i4 from './4.jpg';
import push from './push.png';

const iList = [i1, i2, i3, i4];

class Start extends Component {
    state = {
        ratio: 1,
        index: Math.floor(Math.random() * 4)
    };

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState(prevState => {
                if (prevState.ratio < 1.5) {
                    return {
                        ratio: prevState.ratio + 0.001
                    }
                } else {
                    clearInterval(this.timerID);
                }
            });
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
            <div className="h100 pr df fdc aic jcc oh">
                <div style={styleObj} className="pa w100 h100 brnr bsc" />
                <div className="mask pa w100 h100" />
                <img src={push} className={style.logo} alt="logo" />
                <span className={`${style.text} cfff pa`}>感悟人生只需一刻钟</span>
            </div>
        );
    }
}

export default Start;
