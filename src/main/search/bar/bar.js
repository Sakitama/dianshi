import React, { Component } from 'react';
import style from './bar.css';
import search from './search.svg';
import cross from './cross.svg';

class Bar extends Component {
    searchBackToMain = () => {
        this.props.searchBackToMain();
    };

    startSearch = () => {
        this.props.startSearch(this.input.value);
    };

    reset = () => {
        this.input.value = '';
    };

    render() {
        return (
            <div className={`${style.bar} df aic`}>
                <div className={`${style.container} df aic`}>
                    <img className={style.sicon} src={search} alt="search-icon" />
                    <input ref={input => {
                        this.input = input;
                    }} className={`${style.input} cfff`} placeholder="请输入要搜索的内容" type="text" />
                    <img onClick={this.reset} className={style.cicon} src={cross} alt="cross-icon" />
                </div>
                <span onClick={this.startSearch} className={style.sbtn}>搜索</span>
                <span onClick={this.searchBackToMain} className={style.cbtn}>取消</span>
            </div>
        );
    }
}

export default Bar;
