import React, { Component } from 'react';
import style from './result.css';

class Result extends Component {
    componentDidMount() {
        this.resultIScroll = new window.IScroll(this.div, {
            bounce: false
        });
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.resultIScroll.refresh();
        }, 0);
    }

    render() {
        let data = this.props.searchResult,
            list = data.map(video => {
                return (
                    <li key={video.id} className={`${style.item} df`}>
                        <img src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_170_100.jpg`} alt={video.short_title} />
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
