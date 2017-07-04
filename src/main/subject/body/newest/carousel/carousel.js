import React, { Component } from 'react';
import noImage from './no-image.png';
import vip from './poster_label_pay.png';
import newest from './discover_new_icon.png';

class Carousel extends Component {
    callNative = e => {
        window.util.callNative(e);
    };

    componentDidMount() {
        new window.Swiper('.carousel-swiper', {
            loop: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            centeredSlides: true,
            slidesPerView: 'auto',
            effect: 'coverflow',
            coverflow: {
                rotate: 0,
                depth: 200
            }
        });
    }
    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            content = this.props.data.video_list.map((video, index) => {
                let str = '';
                if (Number(video.total_num) > 1) {
                    if (Number(video.total_num) === Number(video.update_num)) {
                        str = `全${video.total_num}集`;
                    } else {
                        str = `更新至第${video.update_num}集 / 共${video.total_num}集`;
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
                    <div style={{
                        width: '90%'
                    }} onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className="swiper-slide df fdc tac">
                        <div style={{
                            height: `${79 * width / 160 * 0.9}px`
                        }} className="pr">
                            <img className="h100" ref={img => {
                                imgObj = img;
                            }} src={video.img} alt={video.short_title} onError={changeImg} />
                            {video.sns_score ? (<p style={{
                                right: '0',
                                bottom: '0',
                                color: '#eb6558',
                                padding: '2px 10px',
                                backgroundColor: 'rgba(0, 0, 0, .6)'
                            }} className="pa">{video.sns_score.split('.')[0]}<span style={{
                                fontSize: '12px'
                            }}>{`.${video.sns_score.split('.')[1]}`}</span></p>) : null}
                            {str ? (
                                <p style={{
                                    left: '0',
                                    bottom: '0',
                                    padding: '2px 10px',
                                    backgroundColor: 'rgba(0, 0, 0, .6)'
                                }} className="cfff wbba pa">{str}</p>
                            ) : null}
                            {video.is_vip === '1' ? (
                                <img style={{
                                    left: '0',
                                    top: '0',
                                    width: '38px'
                                }} className="pa" src={vip} alt="vip-icon" />
                            ) : null}
                            {video.is_new === '1' ? (
                                <img style={{
                                    left: '0',
                                    top: '0',
                                    width: '108px'
                                }} className="pa" src={newest} alt="newest-icon" />
                            ) : null}
                        </div>
                        <span style={{
                            fontSize: '18px',
                            lineHeight: '20px',
                            marginTop: '10px'
                        }} className="cfff wbba">{video.short_title}</span>
                    </div>
                );
            });
        return (
            <div style={{
                padding: '20px 0'
            }} className="carousel-swiper swiper-container">
                <div className="swiper-wrapper">
                    {content}
                </div>
            </div>
        );
    }
}

export default Carousel;

