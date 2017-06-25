import React, {Component} from 'react';
import Main from './main/main';
import Start from './start/start';
import Error from './main/detail/list/error/error';

const LOADING = 1;
const FAILED = 2;
const COMPLETE = 3;
const NODATA = 4;

let urls = [
    'http://iface.qiyi.com/openapi/realtime/recommend?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=10&dev_os=9&dev_ua=MI%205&dev_hw={cpu:0,gpu:,mem:50.4MB}&net_sts=1&scrn_sts=1&scrn_res=414*736&scrn_dpi=304704&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=GPhone&core=1&req_sn=1493946331320&req_times=1&type=list&version=7.5&psp_uid=213131',
    'http://iface.qiyi.com/openapi/realtime/channel?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=10&dev_os=9&dev_ua=MI%205&dev_hw={cpu:0,gpu:,mem:50.4MB}&net_sts=1&scrn_sts=1&scrn_res=414*736&scrn_dpi=304704&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=GPhone&core=1&req_sn=1493946331320&req_times=1&type=list&version=7.5'
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
            content = <Start />;
        } else if (this.state.flag === FAILED) {
            content = <Error networkError="yes" shouldTry="yes" text="哎呀，网络有点不给力" tryAppFetchData={this.tryAppFetchData}/>;
        } else if (this.state.flag === NODATA) {
            content = <Error noData="yes" shouldTry="yes" text="小点没有收到任何可用的数据" tryAppFetchData={this.tryAppFetchData}/>;
        } else if (this.state.flag === COMPLETE) {
            content = <Main newestPageData={this.state.newestPageData} channelPageData={this.state.channelPageData}/>;
        }
        return (
            <div style={{
                backgroundColor: '#010101'
            }} className="h100">
                {content}
            </div>
        );
    }
}

export default App;
