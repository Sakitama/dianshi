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
        let width = document.body.clientWidth || document.documentElement.clientWidth,
            list = this.props.list.map((item, index) => (
                <li data-value={item} onClick={this.startSearch} style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #2e2e2e'
                }} key={index}>
                    <span style={{
                        fontSize: `12px`,
                        lineHeight: `14px`
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
                    <div style={{
                        padding: '20px 0'
                    }} className="tac">
                        <span onClick={this.props.clearLocalStorage} style={{
                            fontSize: '12px',
                            borderRadius: '20px',
                            padding: '10px 30px',
                            color: '#a3a3a3',
                            backgroundColor: '#303030'
                        }}>清空历史记录</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;
