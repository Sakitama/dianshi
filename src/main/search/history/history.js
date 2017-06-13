import React, { Component } from 'react';
import style from './history.css';

class History extends Component {
    startSearch = e => {
        this.props.startSearch(e.currentTarget.dataset.value);
    };

    render() {
        let list = this.props.list.map((item, index) => (
            <li data-value={item} onClick={this.startSearch} className={`${style.item} cfff`} key={index}>{item}</li>
        ));
        return (
            <div className={`${style.history} h100`}>
                <ul>
                    {list}
                </ul>
                <div className={`${style.wrap} tac`}>
                    <span onClick={this.props.clearLocalStorage} className={style.btn}>清空历史记录</span>
                </div>
            </div>
        );
    }
}

export default History;
