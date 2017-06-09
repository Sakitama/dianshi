import React, {Component} from 'react';
import style from './App.css';
import Navigation from './navigation/navigation';
import Newest from './newest/newest';
import Channel from './channel/channel';

class App extends Component {
    state = {
        currentSlide: 0
    };
    slideTo = (e) => {
        let index = Number(e.currentTarget.dataset.index);
        this.setState({
            currentSlide: index
        });
        this.appSwiper.slideTo(index, 300, false);
    };
    slideTag = index => {
        this.setState({
            currentSlide: index
        });
    };
    componentDidMount() {
        this.appSwiper = new window.Swiper('.App-swiper', {
            resistanceRatio: 0,
            onSlideChangeEnd: swiper => {
                this.slideTag(swiper.realIndex);
            }
        });
    }
    render() {
        return (
            <div className={`${style.App} h100`}>
                <Navigation currentSlide={this.state.currentSlide} slideTo={this.slideTo} />
                <div className="App-swiper swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <Newest />
                        </div>
                        <div className="swiper-slide">
                            <Channel />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
