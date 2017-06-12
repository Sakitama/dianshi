import React, {Component} from 'react';
import style from './App.css';
import Loading from './loading/loading';
import Main from './main/main';

let urls = [
    'http://iface.qiyi.com/openapi/batch/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1',
    'http://iface.qiyi.com/openapi/batch/channel?type=list&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1'
];

class App extends Component {
    state = {
        isDataReady: false,
        newestPageData: null,
        channelPageData: null
    };

    componentDidMount() {
        Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then(responseList => {
            this.setState({
                isDataReady: true,
                newestPageData: responseList[0].data,
                channelPageData: responseList[1].data
            });
        }).catch(reason => {
            console.log(reason);
        });
    }

    render() {
        let content = null;
        if (this.state.isDataReady) {
            content = <Main width={this.div.clientWidth} newestPageData={this.state.newestPageData} channelPageData={this.state.channelPageData} />;
        } else {
            content = <Loading />
        }
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.App} h100`}>
                {content}
            </div>
        );
    }
}

export default App;
