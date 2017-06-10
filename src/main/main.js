import React, {Component} from 'react';
import Navigation from './navigation/navigation';
import Body from './body/body';
import './main.css';

class Main extends Component {
    state = {
        currentSlide: 0
    };

    getSwiper = swiper => {
        this.bodySwiper = swiper;
    };

    slideTo = (e) => {
        let index = Number(e.currentTarget.dataset.index);
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
                <Navigation currentSlide={this.state.currentSlide} slideTo={this.slideTo} />
                <Body slideTag={this.slideTag} getSwiper={this.getSwiper} width={this.props.width} newestPageData={this.props.newestPageData} channelPageData={this.props.channelPageData} />
            </div>
        )
    }
}

export default Main;