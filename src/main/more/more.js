import React, {Component} from 'react';
import style from './more.css';
import bg from './slide_bg.png';
import close from './side_close.png';
import home1 from './side_home.png';
import home2 from './side_home_.png';
import series1 from './side_series.png';
import series2 from './side_series_.png';
import behind1 from './side_behind.png';
import behind2 from './side_behind_.png';

class More extends Component {
    state = {
        current: 'index'
    };

    clickTo = e => {
        let to = e.currentTarget.dataset.to;
        if (to === 'index') {
            this.props.leftBackToMain();
        } else if (to === 'record') {
            this.props.toRecord();
        } else if (to === 'find') {
            this.props.toFind();
        }
        this.setState({
            current: to
        });
    };

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            height = document.body.clientHeight || document.documentElement.clientHeight;
        return (
            <div className={`${style.more} pa w100 h100 ${this.props.showMore ? style.show : style.hidden}`}>
                <div className="pa w100 h100" style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }} />
                <div onClick={this.props.hiddenMore} style={{
                    width: `${80 * width / 720}px`,
                    height: `${80 * height / 921}px`,
                    right: `${100 * width / 720}px`,
                    bottom: `${100 * height / 921}px`
                }} className="pa">
                    <img className="w100" src={close} alt="close" />
                </div>
                <ul style={{
                    top: `${350 * height / 921}px`
                }} className="pa w100">
                    <li style={{
                        padding: `${15 * height / 921}px ${50 * width / 720}px`
                    }} data-to="index" onClick={this.clickTo} className={`df aic${this.state.current === 'index' ? ` ${style.active}` : ''}`}>
                        <img className={style.icon} src={this.state.current === 'index' ? home1 : home2} alt="index" />
                        <span className={`${style.text}${this.state.current === 'index' ? ' cfff' : ''}`}>首页</span>
                    </li>
                    <li style={{
                        padding: `${15 * height / 921}px ${50 * width / 720}px`
                    }} data-to="record" onClick={this.clickTo} className={`${style.item} df aic${this.state.current === 'record' ? ` ${style.active}` : ''}`}>
                        <img className={style.icon} src={this.state.current === 'record' ? series1 : series2} alt="record" />
                        <span className={`${style.text}${this.state.current === 'record' ? ' cfff' : ''}`}>记录</span>
                    </li>
                    <li style={{
                        padding: `${15 * height / 921}px ${50 * width / 720}px`
                    }} data-to="find" onClick={this.clickTo} className={`${style.item} df aic${this.state.current === 'find' ? ` ${style.active}` : ''}`}>
                        <img className={style.icon} src={this.state.current === 'find' ? behind1 : behind2} alt="find" />
                        <span className={`${style.text}${this.state.current === 'find' ? ' cfff' : ''}`}>发现</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default More;