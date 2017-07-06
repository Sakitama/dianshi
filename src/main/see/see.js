import React, {Component} from 'react';
import arrow from './arrow.svg';
import data from './data.json';
import style from './see.css';

class See extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false
        });
    }

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            content = [],
            message = data[this.props.quickIndex].data;
        for (let i = 2, len = message.length; i < len - 1; i++) {
            content.push((
                <li className={style.item} key={i}>
                    <div style={{
                        height: `${message[i].ih * (width - 8) / message[i].iw}px`
                    }} className="pr">
                        <img className="pa w100 h100" src={message[i].m} alt="pic-movie" />
                        <div style={{
                            left: 0,
                            top: 0,
                            width: '70px',
                            height: '30px',
                            backgroundColor: '#000'
                        }} className="pa cfff df jcc aic">
                            <span>{i - 1}</span>
                        </div>
                    </div>
                    <p style={{
                        backgroundColor: '#fff',
                        padding: '10px'
                    }}>{message[i].r}</p>
                </li>
            ));
        }
        return (
            <div className="h100">
                <div style={{
                    fontSize: '12px',
                    height: '8%'
                }} className="df">
                    <div onClick={this.props.seeBackToMain} style={{
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
                        <span className="cfff">详情</span>
                    </div>
                    <div style={{
                        flex: '1'
                    }} />
                </div>
                <div ref={div => {
                    this.div = div;
                }} style={{
                    height: '92%',
                    backgroundColor: '#eee'
                }} className="oh">
                    <div>
                        <ul>
                            {content}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default See;