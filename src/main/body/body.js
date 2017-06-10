import React, {Component} from 'react';
import Newest from './newest/newest';
import Channel from './channel/channel';
import './body.css';

class Body extends Component {
    componentDidMount() {
        this.bodySwiper = new window.Swiper('.App-swiper', {
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
            <div className="App-swiper swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <Newest width={this.props.width} newestPageData={this.props.newestPageData} />
                    </div>
                    <div className="swiper-slide">
                        <Channel width={this.props.width} channelPageData={this.props.channelPageData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;