import React, { Component } from 'react';
import style from './navigation.css';
import menu from './menu.svg';
import search from './search.svg';
import {
    Link
} from 'react-router-dom';

class Navigation extends Component {
    state = {
        current: 'newest'
    };
    render() {
        return (
            <div className={`${style.navigation} df`}>
                <div className={`${style.menu} ${style.btn} aic df`}>
                    <img className={`${style.icon}`} src={menu} alt="menu-icon" />
                </div>
                <div className={`${style.btn} aic df jcc`}>
                    <Link className='cfff tdn' to="/">最新</Link>
                </div>
                <div className={`${style.btn} aic df jcc`}>
                    <Link className='cfff tdn' to="/channel">频道</Link>
                </div>
                <div className={`${style.search} ${style.btn} aic df jcfe`}>
                    <img className={`${style.icon}`} src={search} alt="search-icon" />
                </div>
            </div>
        );
    }
}

export default Navigation;
