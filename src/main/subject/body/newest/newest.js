import React, {Component} from 'react';
import style from './newest.css';
import Carousel from "./carousel/carousel";
import Item from './item/item';

class Newest extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false
        });
    }

    render() {
        let list = [],
            data = this.props.newestPageData;
        for (let i = 1; i < data.length; i++) {
            list.push((
                <li key={data[i].channel_id}>
                    <h1 className={`${style.type} cfff tac`}>{`- ${data[i].channel_name} -`}</h1>
                    <Item width={this.props.width} videoList={data[i].video_list} />
                </li>
            ));
        }
        let content = (
            <div>
                <Carousel width={this.props.width} data={data[0]} />
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
