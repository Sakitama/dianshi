import React, {Component} from 'react';
import Head from './head/head';
import List from './list/list';

class Detail extends Component {
    render() {
        return (
            <div className="h100">
                <Head detailBackToMain={this.props.detailBackToMain} channelName={this.props.channelName} />
                <List channelName={this.props.channelName} />
            </div>
        )
    }
}

export default Detail;