import React, {Component} from 'react';
import style from './queue.css';
import list from '../list.json';

class Queue extends Component {
    componentDidMount() {
        new window.IScroll(this.div, {
            click: true,
            bounce: false
        });
    }

    render() {
        let width = document.body.clientWidth || document.documentElement.clientWidth;
        let content = list.map((item, index) => (
            <li data-index={index} onClick={this.props.toDetailPage} className={style.item} style={{
                backgroundColor: '#f4f4f4',
                marginBottom: '10px'
            }} key={index}>
                <div style={{
                    height: `${323 * width / 600}px`
                }}>
                    <img className="w100 h100" src={item.img_url} alt={item.name} />
                </div>
                <p style={{
                    padding: '20px 20px'
                }} className="tac">{item.name}</p>
            </li>
        ));
        return (
            <div ref={div => {
                this.div = div;
            }} style={{
                height: '92%',
                backgroundColor: '#ebebeb'
            }} className="oh">
                <div>
                    <ul>
                        {content}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Queue;
