import React, {Component} from 'react';
import style from './try.css';

class Try extends Component {
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
        return (
            <div className="h100 df aic jcc">
                <span onClick={this.click} className={`${style.text} cfff`}>{this.props.text}</span>
            </div>
        )
    }
}

export default Try;