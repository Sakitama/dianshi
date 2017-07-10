import React, {Component} from 'react';
import Newest from './newest/newest';
import Channel from './channel/channel';
import Quick from './quick/quick';

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
            <div style={{
                flex: '1'
            }} className="w100 Body-swiper swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <Newest toDetail={this.props.toDetail} newestPageData={this.props.newestPageData} />
                    </div>
                    <div className="swiper-slide">
                        <Channel toDetail={this.props.toDetail} channelPageData={this.props.channelPageData} />
                    </div>
                    <div className="swiper-slide">
                        <Quick toSee={this.props.toSee} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;