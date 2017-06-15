import React, {Component} from 'react';
import style from './list.css';
import Loading from '../../../loading/loading';
import Item from '../../subject/body/newest/item/item';
import Error from './error/error';
import Hot from './hot/hot';

const LOADING = 1;
const FAILED = 2;
const COMPLETE = 3;
const NODATA = 4;

class List extends Component {
    state = {
        listPageData: null,
        flag: LOADING,
        loadingBlock: false
    };

    page = 1;

    isLoading = false;

    total = 0;

    listFirstFetchData = () => {
        fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/channel?type=detail&channel_name=${this.props.channelName}&mode=11&is_purchase=2&page_size=30&page_num=${this.page}&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`))
            .then(response => response.json())
            .then(json => {
                if (json.data && json.data.video_list && json.data.video_list.length > 0) {
                    this.page++;
                    this.total = json.data.total;
                    this.listIScroll = new window.IScroll(this.div, {
                        click: true,
                        probeType: 3,
                        bounce: false
                    });
                    this.listIScroll.on('scroll', () => {
                        if (!this.isLoading && (this.listIScroll.maxScrollY === this.listIScroll.y) && (this.page <= Math.ceil(this.total / 30))) {
                            this.setState({
                                loadingBlock: true
                            });
                            this.isLoading = true;
                            fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/channel?type=detail&channel_name=${this.props.channelName}&mode=11&is_purchase=2&page_size=30&page_num=${this.page}&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`))
                                .then(response => response.json())
                                .then(json => {
                                    if (json.data && json.data.video_list && json.data.video_list.length > 0) {
                                        this.page++;
                                        this.setState(prevState => ({
                                            listPageData: prevState.listPageData.concat(json.data.video_list)
                                        }));
                                    }
                                    this.isLoading = false;
                                    this.setState({
                                        loadingBlock: false
                                    });
                                }).catch(reason => {
                                    console.log(reason);
                                    this.isLoading = false;
                                    this.setState({
                                        loadingBlock: false
                                    });
                                });
                        }
                    });
                    this.setState({
                        listPageData: json.data.video_list,
                        flag: COMPLETE
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

    tryListFirstFetchData = () => {
        this.setState({
            flag: LOADING
        });
        this.listFirstFetchData();
    };

    componentDidMount() {
        this.listFirstFetchData();
    }

    componentDidUpdate() {
        if (this.listIScroll) {
            setTimeout(() => {
                this.listIScroll.refresh();
            }, 0);
        }
    }

    render() {
        let content = null;
        if (this.state.flag === LOADING) {
            content = (
                <div className="h100">
                    <Loading />
                </div>
            );
        } else if (this.state.flag === FAILED) {
            content = (
                <div className="h100">
                    <Error shouldTry="yes" text="哎呀，网络有点不给力" tryListFirstFetchData={this.tryListFirstFetchData} />
                </div>
            );
        } else if (this.state.flag === COMPLETE) {
            let data = this.state.listPageData;
            content = (
                <div>
                    <ul>
                        <Item width={this.props.width} videoList={data} />
                    </ul>
                    {this.state.loadingBlock ? (
                        <Hot />
                    ) : null}
                </div>
            );
        } else if (this.state.flag === NODATA) {
            content = (
                <div className="h100">
                    <Error shouldTry="yes" text="小点没有收到任何可用的数据" tryListFirstFetchData={this.tryListFirstFetchData} />
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