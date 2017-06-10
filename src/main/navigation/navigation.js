import React, { Component } from 'react';
import style from './navigation.css';
import menu from './menu.svg';
import search from './search.svg';

class Navigation extends Component {
    slideTo = e => {
        this.props.slideTo(e);
    };
    render() {
        return (
            <div className={`${style.navigation} df`}>
                <div className={`${style.menu} ${style.btn} aic df`}>
                    <img className={style.icon} src={menu} alt="menu-icon" />
                </div>
                <div data-index="0" onClick={this.slideTo} className={`${style.btn} aic df jcc`}>
                    <span className={this.props.currentSlide === 0 ? "cfff" : "c808080"}>最新</span>
                </div>
                <div data-index="1" onClick={this.slideTo} className={`${style.btn} aic df jcc`}>
                    <span className={this.props.currentSlide === 1 ? "cfff" : "c808080"}>频道</span>
                </div>
                <div className={`${style.search} ${style.btn} aic df jcfe`}>
                    <img className={style.icon} src={search} alt="search-icon" />
                </div>
            </div>
        );
    }
}

export default Navigation;
