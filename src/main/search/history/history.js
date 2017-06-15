import React, { Component } from 'react';
import style from './history.css';

class History extends Component {
    startSearch = e => {
        this.props.startSearch(e.currentTarget.dataset.value);
    };

    componentDidMount() {
        new window.IScroll(this.div, {
            click: true,
            bounce: false
        });
    }

    render() {
        let list = this.props.list.map((item, index) => (
            <li data-value={item} onClick={this.startSearch} className={style.item} key={index}>
                <span className={`${style.text} cfff wbba`}>{item}</span>
            </li>
        ));
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.history} h100 oh`}>
                <div>
                    <ul>
                        {list}
                    </ul>
                    <div className={`${style.wrap} tac`}>
                        <span onClick={this.props.clearLocalStorage} className={style.btn}>清空历史记录</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;
