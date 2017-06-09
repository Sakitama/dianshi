import React, {Component} from 'react';
import style from './newest.css';
import Carousel from "./carousel/carousel";
import Item from './item/item';
import Loading from "../loading/loading";

class Newest extends Component {
    state = {
        isDataReady: false,
        data: null
    };

    componentDidMount() {
        fetch('http://iface.qiyi.com/openapi/batch/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1')
            .then(response => response.json())
            .then(body => {
                this.setState({
                    isDataReady: true,
                    data: body.data
                });
            }).catch(e => {
                console.log(e);
            });
    }

    componentDidUpdate() {
        new window.IScroll(this.div);
    }

    render() {
        let isDataReady = this.state.isDataReady,
            data = this.state.data,
            content = null,
            list = [];
        if (isDataReady) {
            for (let i = 1; i < data.length; i++) {
                list.push((
                    <li key={data[i].channel_id}>
                        <h1 className={`${style.type} cfff tac`}>{`- ${data[i].channel_name} -`}</h1>
                        <Item width={this.div.clientWidth} videoList={data[i].video_list} />
                    </li>
                ));
            }
            content = (
                <div>
                    <Carousel width={this.div.clientWidth} data={data[0]} />
                    <ul>
                        {list}
                    </ul>
                </div>
            );
        } else {
            content = <Loading />
        }
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
