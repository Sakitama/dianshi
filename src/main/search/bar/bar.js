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
                <div onClick={this.startSearch} className={`${style.sbtn} tac`}>搜索</div>
                <div onClick={this.searchBackToMain} className={`${style.cbtn} tac`}>取消</div>
            </div>
        );
    }
}

export default Bar;
