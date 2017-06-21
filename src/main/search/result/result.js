import React, { Component } from 'react';
import style from './result.css';
import noImage from './no-image.png';

class Result extends Component {
    callNative = e => {
        window.util.callNative(e);
    };

    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    render() {
        let data = this.props.searchResult,
            list = data.map((video, index) => {
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
                    <li onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className={`${style.item} df aic`}>
                        <div className={`${style.iwrap} pr`}>
                            <img ref={img => {
                                imgObj = img;
                            }} className="pa w100 h100" src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_170_100.jpg`} alt={video.short_title} onError={changeImg} />
                        </div>
                        <div className={`${style.text} df fdc`}>
                            <span className={`${style.title} wbba cfff`}>{video.title}</span>
                            <span className={`${style.desc} wbba cfff`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
                        </div>
                    </li>
                );
            });
        let content = (
            <div>
                <div style={{
                    padding: '15px'
                }} className="tac">
                    <span className={`${style.pre} wbba`}>搜索到{data.length}条关于“{this.props.searchValue}”的内容</span>
                </div>
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
