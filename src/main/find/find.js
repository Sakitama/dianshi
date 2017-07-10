import React, {Component} from 'react';
import Top from '../record/top/top';
import Movie from './movie/movie';
import Queue from './queue/queue';

class Find extends Component {
    state = {
        page: ''
    };

    backToList = () => {
        this.FindSwiper.slideTo(0, 200, false);
        this.setState({
            page: ''
        });
    };

    toDetailPage = e => {
        this.setState({
            page: e.currentTarget.dataset.index
        });
        this.FindSwiper.slideTo(1, 200, false);
    };

    componentDidMount() {
        this.FindSwiper = new window.Swiper('.Find-swiper', {
            onlyExternal: true
        });
    }

    render() {
        return (
            <div className="Find-swiper swiper-container h100">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="h100 df fdc">
                            <Top showMore={this.props.showMore} title="发现" />
                            <Queue toDetailPage={this.toDetailPage} />
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <Movie backToList={this.backToList} page={this.state.page} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Find;
