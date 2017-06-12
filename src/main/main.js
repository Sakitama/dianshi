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
        listPageData: null,
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
            listPageData: null,
            flag: NONE
        });
    };

    slideToMain = () => {
        this.mainSwiperSlide(1, '');
    };

    toUser = () => {
        this.mainSwiperSlide(0, '');
    };

    toSearch = () => {
        this.mainSwiperSlide(2, '');
        this.setState({
            flag: SEARCH
        });
    };

    toDetail = channelName => {
        this.setState({
            flag: DETAIL
        });
        this.mainSwiperSlide(2, channelName);
    };

    mainSwiperSlide = (index, channelName) => {
        this.mainSwiper.slideTo(index, 50, false);
        if (channelName) {
            fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/channel?type=detail&channel_name=${channelName}&mode=11&is_purchase=2&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`)).then(response => response.json()).then(json => {
                this.setState({
                    listPageData: json
                });
            }).catch(reason => {
                console.log(reason);
            });
            this.setState({
                channelName: channelName
            });
        }
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
            content = <Detail detailBackToMain={this.detailBackToMain} width={this.props.width} channelName={this.state.channelName} listPageData={this.state.listPageData} />;
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