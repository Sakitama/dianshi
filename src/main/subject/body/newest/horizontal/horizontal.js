import React, {Component} from 'react';
import noImage from './no-image.png';
import vip from './poster_label_pay.png';
import newest from './discover_new_icon.png';

class Horizontal extends Component {
    callNative = e => {
        window.util.callNative(e);
    };

    componentDidMount() {
        new window.Swiper(this.div, {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            effect : 'coverflow',
            coverflow: {
                rotate: 30,
                stretch: 10,
                depth: 60,
                modifier: 2,
                slideShadows : true
            }
        });
    }

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            videoList = this.props.videoList;
        return (
            <div ref={div => {
                this.div = div;
            }} className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        videoList.map((video, index) => {
                            let str = '';
                            if (Number(video.total_num) > 1) {
                                if (Number(video.total_num) === Number(video.update_num)) {
                                    str += `全${video.total_num}集`;
                                } else {
                                    str += `更新至${video.update_num}集 / 共${video.total_num}集`;
                                }
                            }
                            let imgObj = null;
                            let changeImg = () => {
                                imgObj.src = noImage;
                                imgObj.style.position = 'absolute';
                                imgObj.style.width = '120px';
                                imgObj.style.height = '120px';
                                imgObj.style.left = '50%';
                                imgObj.style.top = '50%';
                                imgObj.style.marginLeft = '-60px';
                                imgObj.style.marginTop = '-60px';
                            };
                            return (
                                <div onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} style={{
                                    width: '70%',
                                    margin: '0 5px'
                                }} key={index} className="swiper-slide">
                                    <div style={{
                                        height: `${9 * width / 16 * 0.7}px`
                                    }} className="pr">
                                        <img ref={img => {
                                            imgObj = img;
                                        }} className="h100" src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_480_270.jpg`} alt={video.short_title} onError={changeImg} />
                                        {video.is_vip === '1' ? (
                                            <img style={{
                                                left: '0',
                                                top: '0',
                                                width: '28px'
                                            }} className="pa" src={vip} alt="vip-icon" />
                                        ) : null}
                                        {video.is_new === '1' ? (
                                            <img style={{
                                                left: '0',
                                                top: '0',
                                                width: '98px'
                                            }} className="pa" src={newest} alt="newest-icon" />
                                        ) : null}
                                        {video.sns_score ? (<p style={{
                                            right: '0',
                                            bottom: '0',
                                            color: '#eb6558',
                                            padding: '2px 5px',
                                            fontSize: '12px',
                                            backgroundColor: 'rgba(0, 0, 0, .6)'
                                        }} className="pa">{video.sns_score}</p>) : null}
                                        {str ? (
                                            <p style={{
                                                left: '0',
                                                bottom: '0',
                                                padding: '2px 5px',
                                                fontSize: '12px',
                                                backgroundColor: 'rgba(0, 0, 0, .6)'
                                            }} className="cfff wbba pa">{str}</p>
                                        ) : null}
                                    </div>
                                    <p style={{
                                        padding: '10px 0 20px 0'
                                    }} className="df fdc tac">
                                        <span style={{
                                            fontSize: '14px'
                                        }} className="cfff">{video.short_title}</span>
                                        <span style={{
                                            fontSize: '12px',
                                            marginTop: '10px',
                                            color: '#888'
                                        }}>{`已有${video.play_count_text}人观看`}</span>
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Horizontal;
