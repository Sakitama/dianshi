import React, {Component} from 'react';
import style from './item.css';

class Item extends Component {
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
                        <li style={styleObj} key={video.id} className="pr brnr bsc">
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
