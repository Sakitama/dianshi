import React, {Component} from 'react';
import Subject from './subject/subject';
import Detail from './detail/detail';
import Search from './search/search';
import More from './more/more';
import Record from './record/record';
import Find from './find/find';
import Clock from './clock/clock';
import See from './see/see';
import Vr from './vr/vr';

const NONE = 1;
const SEARCH = 2;
const DETAIL = 3;
const RECORD = 4;
const FIND = 5;
const SEE = 6;

class Main extends Component {
    state = {
        flag: NONE,
        leftFlag: NONE,
        showMore: false
    };

    channelName = '';

    quickIndex = 0;

    toVr = () => {
        this.mainSwiperSlide(0);
    };

    searchBackToMain = () => {
        this.mainSwiperSlide(2);
        this.setState({
            flag: NONE
        });
    };

    detailBackToMain = () => {
        this.mainSwiperSlide(2);
        this.channelName = '';
        this.setState({
            flag: NONE
        });
    };

    seeBackToMain = () => {
        this.mainSwiperSlide(2);
        this.quickIndex = 0;
        this.setState({
            flag: NONE
        });
    };

    leftBackToMain = () => {
        this.mainSwiperSlide(2);
        this.setState({
            leftFlag: NONE
        });
    };

    showMore = () => {
        this.setState({
            showMore: true
        });
    };

    hiddenMore = () => {
        this.setState({
            showMore: false
        });
    };

    toRecord = () => {
        this.mainSwiperSlide(1);
        this.setState({
            leftFlag: RECORD
        });
    };

    toFind = () => {
        this.mainSwiperSlide(1);
        this.setState({
            leftFlag: FIND
        });
    };

    toSearch = () => {
        this.mainSwiperSlide(3);
        this.setState({
            flag: SEARCH
        });
    };

    toSee = index => {
        this.mainSwiperSlide(3);
        this.quickIndex = index;
        this.setState({
            flag: SEE
        });
    };

    toDetail = channelName => {
        this.mainSwiperSlide(3);
        this.channelName = channelName;
        this.setState({
            flag: DETAIL
        });
    };

    mainSwiperSlide = index => {
        this.mainSwiper.slideTo(index, 200, false);
    };

    componentDidMount() {
        this.mainSwiper = new window.Swiper('.main-swiper', {
            onlyExternal: true,
            initialSlide: 2
        });
    }

    render() {
        let content = null,
            leftContent = null;
        if (this.state.flag === SEARCH) {
            content = <Search searchBackToMain={this.searchBackToMain} />;
        } else if (this.state.flag === DETAIL) {
            content = <Detail detailBackToMain={this.detailBackToMain} channelName={this.channelName} />;
        } else if (this.state.flag === SEE) {
            content = <See seeBackToMain={this.seeBackToMain} quickIndex={this.quickIndex} />;
        } else if (this.state.flag === NONE) {
            content = null;
        }
        if (this.state.leftFlag === RECORD) {
            leftContent = <Record showMore={this.showMore} />;
        } else if (this.state.leftFlag === FIND) {
            leftContent = <Find showMore={this.showMore} />;
        } else if (this.state.leftFlag === NONE) {
            leftContent = null;
        }
        return (
            <div className="h100 pr">
                <div className="main-swiper swiper-container h100">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <Vr showMore={this.showMore} />
                        </div>
                        <div className="swiper-slide">{leftContent}</div>
                        <div className="swiper-slide">
                            <Subject toSee={this.toSee} toDetail={this.toDetail} toSearch={this.toSearch} showMore={this.showMore} newestPageData={this.props.newestPageData} channelPageData={this.props.channelPageData} />
                        </div>
                        <div className="swiper-slide">{content}</div>
                    </div>
                </div>
                <More toVr={this.toVr} toRecord={this.toRecord} toFind={this.toFind} leftBackToMain={this.leftBackToMain} hiddenMore={this.hiddenMore} showMore={this.state.showMore} />
                <Clock />
            </div>
        )
    }
}

export default Main;