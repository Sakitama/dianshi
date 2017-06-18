import React, {Component} from 'react';
import eye from './eye.svg';
import style from './view.css';

class View extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            click: true,
            bounce: false
        });
    }

    callNative = e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = `iqiyi://mobile/player?aid='${aid}'&tvid='${tvid}'&ftype=27&to=3&url='${encodeURIComponent(window.location.href)}`;
    };

    render() {
        return (
            <div ref={div => {
                this.div = div;
            }} style={{
                height: '92%',
                backgroundColor: '#202020'
            }} className="oh">
                <div>
                    <ul>
                        {this.props.video_list.map((video, index) => {
                            return (
                                <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className={`${style.item} df aic`}>
                                    <div className={style.iwrap}>
                                        <img className="w100 h100" src={video.img} alt={video.short_title} />
                                    </div>
                                    <div className={`${style.text} df fdc`}>
                                        <span className={`${style.title} wbba cfff`}>{video.title}</span>
                                        <div style={{
                                            marginTop: '15px'
                                        }} className="df aic">
                                            <img style={{
                                                width: '20px',
                                                marginRight: '10px'
                                            }} src={eye} alt="eye" />
                                            <span className={`${style.desc} wbba cfff`}>{this.props.date[index]}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div style={{
                        padding: '20px 0'
                    }} className="tac">
                        <span onClick={this.props.clearLocalStorage} style={{
                            fontSize: '12px',
                            borderRadius: '20px',
                            padding: '10px 30px',
                            color: '#a3a3a3',
                            backgroundColor: '#303030'
                        }}>清空历史记录</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
