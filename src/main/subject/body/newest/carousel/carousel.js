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
                if (!video.sns_score) {
                    str = '';
                } else {
                    str = ` / 评分 ${video.sns_score}`;
                }
                return (
                    <div onClick={this.callNative} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className="swiper-slide pr df jcc aic fdc">
                        <img className="pa w100 h100" src={video.img} alt={video.short_title} />
                        <div className="mask pa h100 w100" />
                        <span className={`${style.title} cfff fwb tac`}>{video.title}</span>
                        <span className={`${style.desc} cfff`}>{`播放量 ${video.play_count_text}${str}`}</span>
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

