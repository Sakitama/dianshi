import React, {Component} from 'react';
import style from './item.css';

class Item extends Component {
    callNative = e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(window.location.href);
    };

    render() {
        let videoList = this.props.videoList,
            styleObj = null;
        return (
            <ul>
                {videoList.map(video => {
                    styleObj = {
                        height: `${9 * this.props.width / 16}px`,
                        backgroundImage: `url(${video.img.slice(0, video.img.lastIndexOf('.'))}_480_270.jpg)`
                    };
                    return (
                        <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} style={styleObj} key={video.id} className="pr brnr bsc">
                            <div className="mask pa h100 w100" />
                            <span className={`${style.title} cfff pa`}>{video.title}</span>
                            <span className={`${style.desc} cfff pa`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Item;
