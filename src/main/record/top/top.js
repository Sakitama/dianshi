import React, {Component} from 'react';
import style from './top.css';
import menu from './menu.svg';

class Top extends Component {
    render() {
        return (
            <div style={{
                fontSize: '12px',
                height: '8%'
            }} className="df">
                <div onClick={this.props.showMore} className={`${style.menu} ${style.btn} df aic`}>
                    <img className={style.icon} src={menu} alt="menu-icon" />
                </div>
                <div className={`${style.btn} df jcc aic cfff`}>
                    <span>{this.props.title}</span>
                </div>
                <div className={style.btn} />
            </div>
        );
    }
}

export default Top;
