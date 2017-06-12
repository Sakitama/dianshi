import React, {Component} from 'react';
import style from './list.css';
import Loading from '../../../loading/loading';
import No from './no/no';
import Item from '../../subject/body/newest/item/item';

class List extends Component {
    componentDidMount() {
        this.listIScroll = new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.listIScroll.refresh();
        }, 0);
    }

    render() {
        let content = null;
        if (this.props.listPageData) {
            if (this.props.listPageData.data) {
                let data = this.props.listPageData.data.video_list;
                content = (
                    <div>
                        <ul>
                            <Item width={this.props.width} videoList={data} />
                        </ul>
                    </div>
                );
            } else {
                content = (
                    <div className="h100">
                        <No />
                    </div>
                );
            }
        } else {
            content = (
                <div className="h100">
                    <Loading />
                </div>
            );
        }
        return (
            <div ref={div => {
                this.div = div;
            }} className={`${style.list} oh`}>
                {content}
            </div>
        )
    }
}

export default List;