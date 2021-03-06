import React, { Component } from 'react';
import Bar from './bar/bar';
import Result from './result/result';
import Loading from '../../loading/loading';
import History from './history/history';
import Error from '../detail/list/error/error';

const INIT = 1;
const SEARCHING = 2;
const COMPLETE = 3;
const FAILED = 4;
const NODATA = 5;

class Search extends Component {
    state = {
        searchResult: null,
        searchValue: '',
        searchFlag: INIT
    };

    getNewSearchResult = newResult => {
        this.setState(prevState => ({
            searchResult: prevState.searchResult.concat(newResult)
        }));
    };

    clearLocalStorage = () => {
        window.localStorage.removeItem('searchValue');
        this.setState({
            searchFlag: INIT
        });
    };

    startSearch = value => {
        this.bar.input.value = value;
        this.bar.input.blur();
        if (this.state.searchFlag !== SEARCHING && value !== '') {
            let searchValue = window.localStorage.getItem('searchValue');
            if (!searchValue) {
                window.localStorage.setItem('searchValue', window.JSON.stringify([value]));
            } else {
                searchValue = window.JSON.parse(searchValue);
                searchValue.push(value);
                function uniqueArray(arr) {
                    let obj = {};
                    for (let i = 0, len = arr.length; i < len; i++) {
                        obj[arr[i]] = true;
                    }
                    return Object.keys(obj);
                }
                searchValue = uniqueArray(searchValue);
                window.localStorage.setItem('searchValue', window.JSON.stringify(searchValue));
            }

            fetch(encodeURI(`http://iface.qiyi.com/openapi/realtime/search?app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=10&dev_os=9&dev_ua=MI%205&dev_hw={cpu:0,gpu:,mem:50.4MB}&net_sts=1&scrn_sts=1&scrn_res=320*568&scrn_dpi=181760&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=GPhone&core=1&req_sn=1493946331320&req_times=1&key=${value}&from=mobile_list&pg_num=1&page_size=30&version=7.5`))
                .then(response => response.json())
                .then(json => {
                    if (json.data && json.data.length > 0) {
                        this.setState({
                            searchResult: json.data,
                            searchValue: value,
                            searchFlag: COMPLETE
                        });
                    } else {
                        this.setState({
                            searchFlag: NODATA
                        });
                    }
                }).catch(reason => {
                    console.log(reason);
                    this.setState({
                        searchFlag: FAILED
                    });
                });
            this.setState({
                searchFlag: SEARCHING
            });
        }
    };

    render() {
        let content = null;
        if (this.state.searchFlag === SEARCHING) {
            content = (
                <div style={{
                    height: '92%'
                }}>
                    <Loading />
                </div>
            );
        } else if (this.state.searchFlag === COMPLETE) {
            content = <Result getNewSearchResult={this.getNewSearchResult} searchResult={this.state.searchResult} searchValue={this.state.searchValue} />;
        } else if (this.state.searchFlag === FAILED) {
            content = (
                <div style={{
                    flex: '1'
                }}>
                    <Error networkError="yes" text="哎呀，网络有点不给力" />
                </div>
            );
        } else if (this.state.searchFlag === NODATA) {
            content = (
                <div style={{
                    flex: '1'
                }}>
                    <Error noData="yes" text="小点没有收到任何可用的数据" />
                </div>
            );
        } else if (this.state.searchFlag === INIT) {
            let searchValue = window.localStorage.getItem('searchValue');
            if (searchValue) {
                let list = window.JSON.parse(searchValue);
                content = (
                    <div style={{
                        flex: '1'
                    }}>
                        <History startSearch={this.startSearch} clearLocalStorage={this.clearLocalStorage} list={list} />
                    </div>
                );
            } else {
                content = null;
            }
        }
        return (
            <div className="h100 df fdc">
                <Bar ref={bar => {
                    this.bar = bar;
                }} startSearch={this.startSearch} searchBackToMain={this.props.searchBackToMain} />
                {content}
            </div>
        );
    }
}

export default Search;
