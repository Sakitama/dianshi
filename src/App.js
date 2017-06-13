import React, {Component} from 'react';
import style from './App.css';
import Main from './main/main';
import Start from './start/start';
import Try from './main/detail/list/try/try';
import No from './main/detail/list/no/no';

const LOADING = 1;
const FAILED = 2;
const COMPLETE = 3;
const NODATA = 4;

let urls = [
    'http://iface.qiyi.com/openapi/batch/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1',
    'http://iface.qiyi.com/openapi/batch/channel?type=list&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1'
];

class App extends Component {
    state = {
        flag: LOADING,
        newestPageData: null,
        channelPageData: null
    };

    AppFetchData = () => {
        Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then(responseList => {
            if (responseList[0].data && (responseList[0].data.length > 0) && responseList[1].data && (responseList[1].data.length > 0)) {
                this.setState({
                    flag: COMPLETE,
                    newestPageData: responseList[0].data,
                    channelPageData: responseList[1].data
                });
            } else {
                this.setState({
                    flag: NODATA
                });
            }
        }).catch(reason => {
            console.log(reason);
            this.setState({
                flag: FAILED
            });
        });
    };

    tryAppFetchData = () => {
        this.AppFetchData();
        this.setState({
            flag: LOADING
        });
    };

    componentDidMount() {
        this.AppFetchData();
    }

    render() {
        let content = null;
        if (this.state.flag === LOADING) {
            content = <Start />
        } else if (this.state.flag === FAILED) {
            content = <Try text="哎呀，网络有点不给力，点我帮您重新加载！" tryAppFetchData={this.tryAppFetchData} />
        } else if (this.state.flag === NODATA) {
            content = <No text="小点没有收到任何可用的数据，点我帮您重新加载！" tryAppFetchData={this.tryAppFetchData} />
        } else if (this.state.flag === COMPLETE) {
            content = <Main width={this.div.clientWidth} newestPageData={this.state.newestPageData} channelPageData={this.state.channelPageData} />;
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
