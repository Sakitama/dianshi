import React, {Component} from 'react';
import noImage from './no-image.png';

class Item extends Component {
    callNative = e => {
        window.util.callNative(e);
    };

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            videoList = this.props.videoList,
            styleObj = {
                height: `${9 * width / 16}px`
            };
        return (
            <ul>
                {videoList.map((video, index) => {
                    let str = '';
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
                    let imgObj = null;
                    let changeImg = () => {
                        imgObj.src = noImage;
                        imgObj.style.width = '120px';
                        imgObj.style.height = '120px';
                        imgObj.style.left = '50%';
                        imgObj.style.top = '50%';
                        imgObj.style.marginLeft = '-60px';
                        imgObj.style.marginTop = '-60px';
                    };
                    return (
                        <li onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} style={styleObj} key={index} className="df fdc jcfe pr">
                            <img ref={img => {
                                imgObj = img;
                            }} className="pa w100 h100" src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_480_270.jpg`} alt={video.short_title} onError={changeImg} />
                            <div className="mask pa h100 w100" />
                            <span style={{
                                fontSize: '14px',
                                lineHeight: '16px',
                                padding: '0 12px',
                                zIndex: '0'
                            }} className="cfff">{video.short_title}</span>
                            <span style={{
                                fontSize: '12px',
                                lineHeight: '14px',
                                margin: '20px 0',
                                padding: '0 12px',
                                zIndex: '0'
                            }} className="cfff">{`已有${video.play_count_text}人观看${str}`}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Item;
