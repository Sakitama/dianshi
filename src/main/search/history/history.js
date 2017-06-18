import React, { Component } from 'react';

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
                <li data-value={item} onClick={this.startSearch} style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #2e2e2e'
                }} key={index}>
                    <span style={{
                        fontSize: '12px',
                        lineHeight: '14px'
                    }} className="cfff wbba">{item}</span>
                </li>
            ));
        return (
            <div ref={div => {
                this.div = div;
            }} style={{
                backgroundColor: '#202020'
            }} className="h100 oh">
                <div>
                    <ul>
                        {list}
                    </ul>
                    <div onClick={this.props.clearLocalStorage} style={{
                        padding: '15px 0'
                    }} className="tac">
                        <p style={{
                            width: '200px',
                            fontSize: '12px',
                            lineHeight: '42px',
                            color: '#a3a3a3',
                            backgroundColor: '#303030',
                            borderRadius: '20px',
                            margin: '0 auto'
                        }} className="tac">清空历史记录</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;
