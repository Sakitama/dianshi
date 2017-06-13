import React, { Component } from 'react';
import style from './search.css';
import Bar from './bar/bar';
import Result from './result/result';
import Loading from '../../loading/loading';
import Try from '../../main/detail/list/try/try';
import No from '../../main/detail/list/no/no';
import History from './history/history';

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

    clearLocalStorage = () => {
        window.localStorage.removeItem('searchValue');
        this.setState({
            searchFlag: INIT
        });
    };

    startSearch = value => {
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

            fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/search?key=${value}&from=mobile_list&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`))
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
                <div className={style.wrapper}>
                    <Loading />
                </div>
            );
        } else if (this.state.searchFlag === COMPLETE) {
            content = <Result searchResult={this.state.searchResult} searchValue={this.state.searchValue} />;
        } else if (this.state.searchFlag === FAILED) {
            content = (
                <div className={style.wrapper}>
                    <Try text="哎呀，网络有点不给力，再试一次吧！" />
                </div>
            );
        } else if (this.state.searchFlag === NODATA) {
            content = (
                <div className={style.wrapper}>
                    <No text="小点没有收到任何可用的数据，再试一次吧！" />
                </div>
            );
        } else if (this.state.searchFlag === INIT) {
            let searchValue = window.localStorage.getItem('searchValue');
            if (searchValue) {
                let list = window.JSON.parse(searchValue);
                content = (
                    <div className={style.wrapper}>
                        <History startSearch={this.startSearch} clearLocalStorage={this.clearLocalStorage} list={list} />
                    </div>
                );
            } else {
                content = null;
            }
        }
        return (
            <div className="h100">
                <Bar startSearch={this.startSearch} searchBackToMain={this.props.searchBackToMain} />
                {content}
            </div>
        );
    }
}

export default Search;
