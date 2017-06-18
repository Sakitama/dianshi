import React, {Component} from 'react';
import arrow from './arrow.svg';

class Movie extends Component {
    render() {
        return (
            <div className="h100">
                <div style={{
                    fontSize: '12px',
                    height: '8%'
                }} className="df">
                    <div style={{
                        paddingLeft: '1em',
                        flex: '1'
                    }} className="df aic" onClick={this.props.backToList}>
                        <img style={{
                            width: '2em'
                        }} src={arrow} alt="arrow-icon" />
                    </div>
                    <div style={{
                        flex: '1'
                    }} className="df jcc aic">
                        <span className="cfff">点评</span>
                    </div>
                    <div style={{
                        flex: '1'
                    }} />
                </div>
                <div style={{
                    height: '92%'
                }}>
                    {this.props.page ? (
                        <iframe title={this.props.page} seamless height="100%" width="100%" src={`http://opeue8j3v.bkt.clouddn.com/page${this.props.page}.html`} />
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Movie;
