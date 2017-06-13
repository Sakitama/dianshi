import React, {Component} from 'react';
import './main.css';
import Subject from './subject/subject';
import Detail from './detail/detail';
import Search from './search/search';

const NONE = 0;
const SEARCH = 1;
const DETAIL = 2;

class Main extends Component {
    state = {
        channelName: '',
        flag: NONE
    };

    searchBackToMain = () => {
        this.slideToMain();
        this.setState({
            flag: NONE
        });
    };

    detailBackToMain = () => {
        this.slideToMain();
        this.setState({
            channelName: '',
            flag: NONE
        });
    };

    slideToMain = () => {
        this.mainSwiperSlide(1);
    };

    toUser = () => {
        this.mainSwiperSlide(0);
    };

    toSearch = () => {
        this.mainSwiperSlide(2);
        this.setState({
            flag: SEARCH
        });
    };

    toDetail = channelName => {
        this.mainSwiperSlide(2);
        this.setState({
            channelName: channelName,
            flag: DETAIL
        });
    };

    mainSwiperSlide = index => {
        this.mainSwiper.slideTo(index, 50, false);
    };

    componentDidMount() {
        this.mainSwiper = new window.Swiper('.main-swiper', {
            onlyExternal: true,
            initialSlide: 1
        });
    }

    render() {
        let content = null;
        if (this.state.flag === SEARCH) {
            content = <Search searchBackToMain={this.searchBackToMain} />;
        } else if (this.state.flag === DETAIL) {
            content = <Detail detailBackToMain={this.detailBackToMain} width={this.props.width} channelName={this.state.channelName} />;
        } else if (this.state.flag === NONE) {
            content = null;
        }
        return (
            <div className="main-swiper swiper-container h100">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">User</div>
                    <div className="swiper-slide">
                        <Subject toDetail={this.toDetail} toSearch={this.toSearch} toUser={this.toUser} mainSwiperSlide={this.mainSwiperSlide} width={this.props.width} newestPageData={this.props.newestPageData} channelPageData={this.props.channelPageData} />
                    </div>
                    <div className="swiper-slide">
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;