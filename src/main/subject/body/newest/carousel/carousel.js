import React, { Component } from 'react';
import style from './carousel.css';

class Carousel extends Component {
    componentDidMount() {
        this.carouselSwiper = new window.Swiper('.carousel-swiper', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }
    render() {
        let styleObj = null,
            styleHeight = {
                height: `${79 * this.props.width / 160}px`
            },
        content = this.props.data.video_list.map(video => {
            styleObj = {
                backgroundImage: `url(${video.img})`
            };
            return (
                <div key={video.id} style={styleObj} className="swiper-slide pr df jcc aic fdc bsc">
                    <div className="mask pa h100 w100" />
                    <span className={`${style.title} cfff fwb tac`}>{video.title}</span>
                    <span className={`${style.desc} cfff`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
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

