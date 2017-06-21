import React, {Component} from 'react';
import Carousel from './carousel/carousel';
import Item from './item/item';

class Newest extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    toDetail = e => {
        this.props.toDetail(e.currentTarget.dataset.channelname);
    };

    render() {
        let list = [],
            data = this.props.newestPageData;
        for (let i = 1; i < data.length; i++) {
            list.push((
                <li data-channelName={data[i].channel_name} onClick={this.toDetail} key={data[i].channel_id}>
                    <div style={{
                        fontSize: '12px',
                        padding: '1em'
                    }} className="tac">
                        <span className="cfff">{`- ${data[i].channel_name} -`}</span>
                    </div>
                    <Item videoList={data[i].video_list} />
                </li>
            ));
        }
        let content = (
            <div>
                <Carousel data={data[0]} />
                <ul>
                    {list}
                </ul>
            </div>
        );
        return (
            <div ref={div => {
                this.div = div;
            }} className="h100 oh">
                {content}
            </div>
        );
    }
}

export default Newest;
