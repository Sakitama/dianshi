import React, {Component} from 'react';
import networkError from './network-error.png';
import noData from './no-data.png';
import noViewHistory from './no-view-history.png';
import circle from './circle.svg';

class Error extends Component {
    click = () => {
        if (this.props.tryListFirstFetchData) {
            this.props.tryListFirstFetchData();
        } else if (this.props.tryAppFetchData) {
            this.props.tryAppFetchData();
        } else {
            return null;
        }
    };

    render() {
        let img = null;
        if (this.props.networkError === 'yes') {
            img = networkError;
        } else if (this.props.noData === 'yes') {
            img = noData;
        } else if (this.props.noViewHistory === 'yes') {
            img = noViewHistory;
        }
        return (
            <div style={{
                backgroundColor: '#DAD9D7'
            }} className="h100 df fdc jcc aic">
                <img style={{
                    width: '200px'
                }} src={img} alt="something wrong" />
                <span style={{
                    margin: '20px 0',
                    color: '#555'
                }}>{this.props.text}</span>
                {this.props.shouldTry === 'yes' ? (
                    <div onClick={this.click} className="df aic">
                        <img style={{
                            width: '24px'
                        }} src={circle} alt="circle" />
                        <span style={{
                            fontSize: '12px',
                            color: '#555'
                        }}>点我重试一次</span>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Error;
