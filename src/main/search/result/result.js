import React, { Component } from 'react';
import style from './result.css';

class Result extends Component {
    callNative = e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(window.location.href);
    };

    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

/*    componentDidUpdate() {
        setTimeout(() => {
            this.resultIScroll.refresh();
        }, 0);
    }*/

    render() {
        let data = this.props.searchResult,
            styleObj = null,
            list = data.map(video => {
                styleObj = {
                    backgroundImage: `url(${video.img.slice(0, video.img.lastIndexOf('.'))}_170_100.jpg)`
                };
                return (
                    <li onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={video.id} className={`${style.item} df`}>
                        <div style={styleObj} className={`${style.iwrap} brnr bsc`} />
                        <div className={`${style.text} df fdc jcc`}>
                            <span className={`${style.title} cfff`}>{video.title}</span>
                            <span className={`${style.desc} cfff`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
                        </div>
                    </li>
                );
            });
        let content = (
            <div>
                <p className={`${style.count} tac`}>搜索到{data.length}条关于“{this.props.searchValue}”的内容</p>
                <ul>
                    {list}
                </ul>
            </div>
        );
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.result} oh`}>
                {content}
            </div>
        )
    }
}

export default Result;
