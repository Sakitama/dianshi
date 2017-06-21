import React, {Component} from 'react';
import Newest from './newest/newest';
import Channel from './channel/channel';

class Body extends Component {
    componentDidMount() {
        this.bodySwiper = new window.Swiper('.Body-swiper', {
            resistanceRatio: 0,
            onTransitionEnd: swiper => {
                this.props.slideTag(swiper.realIndex);
            },
            followFinger: false
        });
        this.props.getSwiper(this.bodySwiper);
    }

    render() {
        return (
            <div className="Body-swiper swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <Newest toDetail={this.props.toDetail} newestPageData={this.props.newestPageData} />
                    </div>
                    <div className="swiper-slide">
                        <Channel toDetail={this.props.toDetail} channelPageData={this.props.channelPageData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;