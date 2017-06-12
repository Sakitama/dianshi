import React, { Component } from 'react';
import style from './search.css';
import Bar from './bar/bar';
import Result from './result/result';
import Loading from '../../loading/loading';

const INIT = 0;
const SEARCHING = 1;
const COMPLETE = 2;

class Search extends Component {
    state = {
        searchResult: null,
        searchValue: '',
        searchFlag: INIT
    };

    startSearch = value => {
        if (this.state.searchFlag !== SEARCHING) {
            this.setState({
                searchFlag: SEARCHING
            });
            fetch(encodeURI(`http://iface.qiyi.com/openapi/batch/search?key=${value}&from=mobile_list&page_size=30&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1`))
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        searchResult: json.data,
                        searchValue: value,
                        searchFlag: COMPLETE
                    });
                }).catch(reason => {
                console.log(reason);
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
        } else if (this.state.searchFlag === INIT) {
            content = null;
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
