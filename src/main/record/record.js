import React, {Component} from 'react';
import Top from './top/top';
import Error from '../detail/list/error/error';
import style from './record.css';

class Record extends Component {
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
        let content = null,
            data = null,
            video_list = [],
            viewHistory = window.localStorage.getItem('viewHistory');
        if (!viewHistory) {
            content = <Error noViewHistory="yes" text="再怎么找也没有啦" />;
        } else {
            data = window.JSON.parse(viewHistory);
            for (let video of data) {
                video_list.push(window.JSON.parse(video.data));
            }
            content = (
                <div>
                    <ul>
                        {video_list.map((video, index) => {
                            return (
                                <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className={`${style.item} df aic`}>
                                    <div className={style.iwrap}>
                                        <img className="w100 h100" src={video.img} alt={video.short_title} />
                                    </div>
                                    <div className={`${style.text} df fdc`}>
                                        <span className={`${style.title} wbba cfff`}>{video.title}</span>
                                        <span className={`${style.desc} wbba cfff`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        }
        return (
            <div className="h100">
                <Top showMore={this.props.showMore} title="记录" />
                <div ref={div => {
                    this.div = div;
                }} style={{
                    height: '92%',
                    backgroundColor: '#202020'
                }} className="oh">
                    {content}
                </div>
            </div>
        );
    }
}

export default Record;
