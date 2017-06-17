import React, {Component} from 'react';
import Navigation from './navigation/navigation';
import Body from './body/body';

class Subject extends Component {
    state = {
        currentSlide: 0
    };

    getSwiper = swiper => {
        this.bodySwiper = swiper;
    };

    slideTo = index => {
        this.setState({
            currentSlide: index
        });
        this.bodySwiper.slideTo(index, 200, false);
    };

    slideTag = index => {
        this.setState({
            currentSlide: index
        });
    };

    render() {
        return (
            <div className="h100">
                <Navigation toSearch={this.props.toSearch} showMore={this.props.showMore} currentSlide={this.state.currentSlide} slideTo={this.slideTo} />
                <Body toDetail={this.props.toDetail} slideTag={this.slideTag} getSwiper={this.getSwiper} newestPageData={this.props.newestPageData} channelPageData={this.props.channelPageData} />
            </div>
        )
    }
}

export default Subject;