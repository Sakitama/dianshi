import React, {Component} from 'react';
import style from './channel.css';

import movie from './movie.jpg';
import series from './series.jpg';
import record from './record.jpg';
import cartoon from './cartoon.jpg';
import music from './music.jpg';
import entertainment from './entertainment.jpg';
import variety from './variety.jpg';
import test from './test.jpg';
import game from './game.jpg';
import other from './other.jpg';
import travel from './travel.jpg';
import study from './study.jpg';
import trailer from './trailer.jpg';
import hd from './hd.jpg';
import education from './education.jpg';
import fashion from './fashion.jpg';
import fe from './fe.jpg';
import child from './child.jpg';
import sm from './sm.jpg';
import sport from './sport.jpg';
import olympic from './olympic.jpg';
import ad from './ad.jpg';
import life from './life.jpg';
import fun from './fun.jpg';
import economic from './economic.jpg';
import aiqiyi from './aiqiyi.jpg';
import news from './news.jpg';
import car from './car.jpg';
import original from './original.jpg';
import military from './military.jpg';
import worldcup from './worldcup.jpg';
import paike from './paike.jpg';
import dolby from './dolby.jpg';
import baby from './baby.jpg';
import science from './science.jpg';
import talk from './talk.jpg';
import health from './health.jpg';
import love from './love.jpg';
import gongyi from './gongyi.jpg';
import audio from './audio.jpg';
import vr from './vr.jpg';
import threed from './threed.jpg';

const pictureList = [
    movie,
    series,
    record,
    cartoon,
    music,
    entertainment,
    variety,
    test,
    game,
    other,
    travel,
    study,
    trailer,
    hd,
    education,
    fashion,
    fe,
    child,
    sm,
    sport,
    olympic,
    ad,
    life,
    fun,
    economic,
    aiqiyi,
    news,
    car,
    original,
    military,
    worldcup,
    paike,
    dolby,
    baby,
    science,
    talk,
    health,
    love,
    gongyi,
    audio,
    vr,
    threed
];

class Channel extends Component {
    toDetail = e => {
        this.props.toDetail(e.currentTarget.dataset.channelname);
    };

    componentDidMount() {
        new window.IScroll(this.div, {
            bounce: false,
            click: true
        });
    }

    render() {
        let styleObj = null,
            data = this.props.channelPageData,
            content = data.map((item, i) => {
                styleObj = {
                    height: `${this.props.width / 2}px`,
                    backgroundImage: `url(${pictureList[i]})`
                };
                return (
                    <li data-channelName={item.name} onClick={this.toDetail} key={item.id} style={styleObj} className={`${style.item} aic jcc df brnr bsc pr`}>
                        <div className="mask pa h100 w100" />
                        <span className={`${style.text} cfff`}>{`# ${item.name} #`}</span>
                    </li>
                );
            });
        return (
            <div ref={div => {
                this.div = div;
            }} className="h100 oh">
                <ul className="fww df">
                    {content}
                </ul>
            </div>
        );
    }
}

export default Channel;
