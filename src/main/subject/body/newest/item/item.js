import React, {Component} from 'react';
import style from './item.css';

class Item extends Component {
    callNative = e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(window.location.href);
    };

    render() {
        let str = '',
            videoList = this.props.videoList,
            styleObj = null;
        return (
            <ul>
                {videoList.map((video, index) => {
                    str = '';
                    if (video.sns_score) {
                        str += ` | 评分${video.sns_score}`;
                    }
                    if (Number(video.total_num) > 1) {
                        if (Number(video.total_num) === Number(video.update_num)) {
                            str += ` | 全${video.total_num}集`;
                        } else {
                            str += ` | 更新至${video.update_num}集 / 共${video.total_num}集`;
                        }
                    }
                    styleObj = {
                        height: `${9 * this.props.width / 16}px`
                    };
                    return (
                        <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} style={styleObj} key={index} className="df fdc jcfe pr">
                            <img className="pa w100 h100" src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_480_270.jpg`} alt={video.short_title} />
                            <div className="mask pa h100 w100" />
                            <span className={`${style.title} cfff`}>{video.title}</span>
                            <span className={`${style.desc} cfff`}>{`已有${video.play_count_text}人观看${str}`}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Item;
