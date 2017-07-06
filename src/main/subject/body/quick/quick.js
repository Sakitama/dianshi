import React, {Component} from 'react';
import page from './data.json';
import style from './quick.css';

class Quick extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    toSee = e => {
        this.props.toSee(e.currentTarget.dataset.index);
    };

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            data = page.data,
            content = data.map((item, index) => {
                return (
                    <li onClick={this.toSee} data-index={index} key={index} className={`${style.item} df fdc`}>
                        <div style={{
                            height: `${(width - 15) / 2 * 23 / 32}px`,
                            fontSize: '0'
                        }}>
                            <img className="w100 h100" src={item.bpic} alt={item.name} />
                        </div>
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '10px'
                        }}>
                            <p className={style.text} style={{
                                fontSize: '16px',
                                marginBottom: '10px'
                            }}>{item.name}</p>
                            <p className={style.text} style={{
                                fontSize: '12px',
                                color: '#bbb'
                            }}>{item.subtitle}</p>
                        </div>
                    </li>
                );
            });
        return (
            <div ref={div => {
                this.div = div;
            }} style={{
                backgroundColor: '#eee'
            }} className="h100 oh">
                <div>
                    <ul className="fww df">
                        {content}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Quick;
