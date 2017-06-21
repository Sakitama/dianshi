import React, { Component } from 'react';
import style from './result.css';
import noImage from './no-image.png';
import Hot from '../../detail/list/hot/hot';

class Result extends Component {
    state = {
        loadingBlock: false
    };

    callNative = e => {
        window.util.callNative(e);
    };

    page = 2;

    isLoading = false;

    componentDidMount() {
        this.resultIScroll = new window.IScroll(this.div, {
            click: true,
            probeType: 3,
            bounce: false
        });
        this.resultIScroll.on('scroll', () => {
            if (!this.isLoading && (this.resultIScroll.maxScrollY === this.resultIScroll.y)) {
                this.setState({
                    loadingBlock: true
                });
                this.isLoading = true;
                fetch(encodeURI(`http://iface.qiyi.com/openapi/realtime/search?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=10&dev_os=9&dev_ua=MI%205&dev_hw={cpu:0,gpu:,mem:50.4MB}&net_sts=1&scrn_sts=1&scrn_res=320*568&scrn_dpi=181760&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=GPhone&core=1&req_sn=1493946331320&req_times=1&key=${this.props.searchValue}&from=mobile_list&pg_num=${this.page}&page_size=30&version=7.5`))
                    .then(response => response.json())
                    .then(json => {
                        if (json.data && json.data.length > 0) {
                            this.page++;
                            this.props.getNewSearchResult(json.data);
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
    }

    componentDidUpdate() {
        if (this.resultIScroll) {
            setTimeout(() => {
                this.resultIScroll.refresh();
            }, 0);
        }
    }

    render() {
        let data = this.props.searchResult,
            list = data.map((video, index) => {
                let imgObj = null;
                let changeImg = () => {
                    imgObj.src = noImage;
                    imgObj.style.width = '60px';
                    imgObj.style.height = '60px';
                    imgObj.style.left = '50%';
                    imgObj.style.top = '50%';
                    imgObj.style.marginLeft = '-30px';
                    imgObj.style.marginTop = '-30px';
                };
                return (
                    <li onClick={this.callNative} data-video={window.JSON.stringify(video)} data-aid={video.a_id} data-tvid={video.tv_id} key={index} className={`${style.item} df aic`}>
                        <div className={`${style.iwrap} pr`}>
                            <img ref={img => {
                                imgObj = img;
                            }} className="pa w100 h100" src={`${video.img.slice(0, video.img.lastIndexOf('.'))}_170_100.jpg`} alt={video.short_title} onError={changeImg} />
                        </div>
                        <div className={`${style.text} df fdc`}>
                            <span className={`${style.title} wbba cfff`}>{video.title}</span>
                            <span className={`${style.desc} wbba cfff`}>{`播放量 ${video.play_count_text} / ${video.date_format}`}</span>
                        </div>
                    </li>
                );
            });
        let content = (
            <div>
                <ul>
                    {list}
                </ul>
                {this.state.loadingBlock ? (
                    <Hot />
                ) : null}
            </div>
        );
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.result} oh`}>
                {content}
            </div>
        )
    }
}

export default Result;
