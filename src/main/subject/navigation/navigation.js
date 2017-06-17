import React, { Component } from 'react';
import style from './navigation.css';
import menu from './menu.svg';
import search from './search.svg';

class Navigation extends Component {
    showMore = () => {
        this.props.showMore();
    };

    toSearch = () => {
        this.props.toSearch();
    };

    slideTo = e => {
        this.props.slideTo(Number(e.currentTarget.dataset.index));
    };

    render() {
        return (
            <div style={{
                fontSize: '12px',
                height: '8%'
            }} className="df">
                <div onClick={this.showMore} className={`${style.menu} ${style.btn} df aic`}>
                    <img className={style.icon} src={menu} alt="menu-icon" />
                </div>
                <div data-index="0" onClick={this.slideTo} className={`${style.btn} df jcc aic`}>
                    <span className={this.props.currentSlide === 0 ? "cfff" : "c808080"}>最新</span>
                </div>
                <div data-index="1" onClick={this.slideTo} className={`${style.btn} df jcc aic`}>
                    <span className={this.props.currentSlide === 1 ? "cfff" : "c808080"}>频道</span>
                </div>
                <div onClick={this.toSearch} className={`${style.search} ${style.btn} df aic jcfe`}>
                    <img className={style.icon} src={search} alt="search-icon" />
                </div>
            </div>
        );
    }
}

export default Navigation;
