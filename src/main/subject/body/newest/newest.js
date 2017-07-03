import React, {Component} from 'react';
import Carousel from './carousel/carousel';
import Horizontal from './horizontal/horizontal';

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
            text = '',
            data = this.props.newestPageData;
        for (let i = 1; i < data.length; i++) {
            if (data[i].channel_name === '资讯') {
                text = '新鲜事，简单报';
            }
            if (data[i].channel_name === '电视剧') {
                text = '根本停不下来';
            }
            if (data[i].channel_name === '电影') {
                text = '用一个好故事，描述生活的不可思议';
            }
            if (data[i].channel_name === '综艺') {
                text = '全球网红在表演什么';
            }
            list.push((
                <li key={data[i].channel_id}>
                    <p style={{
                        paddingBottom: '10px'
                    }} className="df fdc aic">
                        <span style={{
                            fontWeight: 'bold'
                        }} className="cfff">{`- ${data[i].channel_name} -`}</span>
                        <span style={{
                            fontSize: '12px',
                            color: '#888',
                            marginTop: '10px'
                        }}>{text}</span>
                    </p>
                    <Horizontal videoList={data[i].video_list} />
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
