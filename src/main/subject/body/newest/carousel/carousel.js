import React, { Component } from 'react';
import noImage from './no-image.png';

class Carousel extends Component {
    callNative = e => {
        window.util.callNative(e);
    };

    componentDidMount() {
        new window.Swiper('.carousel-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }
    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            styleHeight = {
                height: `${79 * width / 160}px`
            },
            content = this.props.data.video_list.map((video, index) => {
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
                    <div onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className="swiper-slide pr df fdc jcc tac">
                        <img ref={img => {
                            imgObj = img;
                        }} className="pa w100 h100" src={video.img} alt={video.short_title} onError={changeImg} />
                        <div className="mask pa h100 w100" />
                        <span style={{
                            lineHeight: '18px',
                            marginBottom: '20px',
                            padding: '0 12px',
                            zIndex: '0'
                        }} className="cfff wbba">{video.title}</span>
                        <span style={{
                            fontSize: '12px',
                            lineHeight: '14px',
                            padding: '0 12px',
                            zIndex: '0'
                        }} className="cfff wbba">{`已有${video.play_count_text}人观看${str}`}</span>
                    </div>
                );
            });
        return (
            <div ref={div => {
                this.div = div;
            }} style={styleHeight}>
                <div className="carousel-swiper h100 swiper-container">
                    <div className="swiper-wrapper">
                        {content}
                    </div>
                    <div className="swiper-pagination" />
                </div>
            </div>
        );
    }
}

export default Carousel;

