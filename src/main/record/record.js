import React, {Component} from 'react';
import Top from './top/top';
import Error from '../detail/list/error/error';
import View from './view/view';

class Record extends Component {
    state = {
        viewHistory: window.localStorage.getItem('viewHistory')
    };

    clearLocalStorage = () => {
        window.localStorage.removeItem('viewHistory');
        this.setState({
            viewHistory: null
        });
    };

    render() {
        let content = null,
            data = null,
            date = [],
            video_list = [];
        if (!this.state.viewHistory) {
            content = <Error noViewHistory="yes" text="再怎么找也没有啦" />;
        } else {
            data = window.JSON.parse(this.state.viewHistory);
            for (let video of data) {
                video_list.push(window.JSON.parse(video.data));
                date.push(video.date);
            }
            content = <View video_list={video_list} date={date} clearLocalStorage={this.clearLocalStorage} />;
        }
        return (
            <div className="h100 df fdc">
                <Top showMore={this.props.showMore} title="记录" />
                {content}
            </div>
        );
    }
}

export default Record;
