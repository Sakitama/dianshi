import React, {Component} from 'react';
import Subject from './subject/subject';
import Detail from './detail/detail';
import Search from './search/search';
import More from './more/more';

const NONE = 1;
const SEARCH = 2;
const DETAIL = 3;

class Main extends Component {
    state = {
        channelName: '',
        flag: NONE,
        showMore: false
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
        this.mainSwiper.slideTo(index, 200, false);
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
            content = <Detail detailBackToMain={this.detailBackToMain} channelName={this.state.channelName} />;
        } else if (this.state.flag === NONE) {
            content = null;
        }
        return (
            <div className="h100 pr">
                <div className="main-swiper swiper-container h100">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">User</div>
                        <div className="swiper-slide">
                            <Subject toDetail={this.toDetail} toSearch={this.toSearch} showMore={this.showMore} newestPageData={this.props.newestPageData} channelPageData={this.props.channelPageData} />
                        </div>
                        <div className="swiper-slide">
                            {content}
                        </div>
                    </div>
                </div>
                <More hiddenMore={this.hiddenMore} showMore={this.state.showMore} />
            </div>
        )
    }
}

export default Main;