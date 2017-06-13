import React, {Component} from 'react';
import style from './list.css';
import Loading from '../../../loading/loading';
import No from './no/no';
import Item from '../../subject/body/newest/item/item';

class List extends Component {
    state = {
        listPageData: null
    };

    componentDidMount() {
        fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/channel?type=detail&channel_name=${this.props.channelName}&mode=11&is_purchase=2&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`)).then(response => response.json()).then(json => {
            this.setState({
                listPageData: json
            });
        }).catch(reason => {
            console.log(reason);
        });
        this.listIScroll = new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.listIScroll.refresh();
        }, 0);
    }

    render() {
        let content = null;
        if (this.state.listPageData) {
            if (this.state.listPageData.data) {
                let data = this.state.listPageData.data.video_list;
                content = (
                    <div>
                        <ul>
                            <Item width={this.props.width} videoList={data} />
                        </ul>
                    </div>
                );
            } else {
                content = (
                    <div className="h100">
                        <No />
                    </div>
                );
            }
        } else {
            content = (
                <div className="h100">
                    <Loading />
                </div>
            );
        }
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.list} oh`}>
                {content}
            </div>
        )
    }
}

export default List;