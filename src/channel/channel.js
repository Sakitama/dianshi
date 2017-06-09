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
    state = {
        isDataReady: false,
        data: null
    };

    componentDidMount() {
        fetch('http://iface.qiyi.com/openapi/batch/channel?type=list&version=7.5&app_k=f0f6c3ee5709615310c0f053dc9c65f2&app_v=8.4&app_t=0&platform_id=12&dev_os=10.3.1&dev_ua=iPhone9,3&dev_hw=%7B%22cpu%22%3A0%2C%22gpu%22%3A%22%22%2C%22mem%22%3A%2250.4MB%22%7D&net_sts=1&scrn_sts=1&scrn_res=1334*750&scrn_dpi=153600&qyid=87390BD2-DACE-497B-9CD4-2FD14354B2A4&secure_v=1&secure_p=iPhone&core=1&req_sn=1493946331320&req_times=1')
            .then(response => response.json())
            .then(body => {
                this.setState({
                    isDataReady: true,
                    data: body.data
                });
            }).catch(e => {
                console.log(e);
            });
    }

    componentDidUpdate() {
        new window.IScroll(this.div, {
            bounce: false
        });
    }

    render() {
        let isDataReady = this.state.isDataReady,
            styleObj = null,
            content = null;
        if (isDataReady) {
            content = this.state.data.map((item, i) => {
                styleObj = {
                    height: `${this.div.clientWidth / 2}px`,
                    backgroundImage: `url(${pictureList[i]})`
                };
                return (
                    <li key={item.id} style={styleObj} className={`${style.item} cfff aic jcc df brnr bsc pr`}>
                        <div className="mask pa h100 w100" />
                        <span className={`${style.text} fwb`}>{`# ${item.name} #`}</span>
                    </li>
                );
            });
        }
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
