import React, {Component} from 'react';
import eye from './eye.svg';
import style from './view.css';
import noImage from './no-image.png';

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
        window.location.href = `iqiyi://mobile/player?aid=${aid}&tvid=${tvid}&ftype=27&to=3&url=${encodeURIComponent(window.location.href)}`;
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
                            let imgObj = null;
                            let changeImg = () => {
                                imgObj.src = noImage;
                                imgObj.style.width = '60px';
                                imgObj.style.height = '60px';
                                imgObj.style.left = '50%';
                                imgObj.style.top = '50%';
                                imgObj.style.marginLeft = '-30px';
                                imgObj.style.marginTop = '-30px';
                            };
                            return (
                                <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className={`${style.item} df aic`}>
                                    <div className={`${style.iwrap} pr`}>
                                        <img ref={img => {
                                            imgObj = img;
                                        }} className="pa w100 h100" src={video.img} alt={video.short_title} onError={changeImg} />
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
                    <div onClick={this.props.clearLocalStorage} style={{
                        paddingBottom: '15px'
                    }} className="tac">
                        <p style={{
                            width: '200px',
                            fontSize: '12px',
                            lineHeight: '42px',
                            color: '#a3a3a3',
                            backgroundColor: '#303030',
                            borderRadius: '20px',
                            margin: '0 auto'
                        }} className="tac">清空历史记录</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
