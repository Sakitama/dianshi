import React, { Component } from 'react';
import style from './carousel.css';

class Carousel extends Component {
    callNative = e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(window.location.href);
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
        let str = '',
            styleHeight = {
                height: `${79 * this.props.width / 160}px`
            },
            content = this.props.data.video_list.map((video, index) => {
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
                return (
                    <div onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className="swiper-slide pr df jcc tac fdc">
                        <img className="pa w100 h100" src={video.img} alt={video.short_title} />
                        <div className="mask pa h100 w100" />
                        <span className={`${style.title} cfff wbba`}>{video.title}</span>
                        <span className={`${style.desc} cfff wbba`}>{`已有${video.play_count_text}人观看${str}`}</span>
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

