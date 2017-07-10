import React, {Component} from 'react';
import city from './city.jpg';
import cubes from './cubes.jpg';
import sechelt from './sechelt.jpg';
import thumbCity from './thumb-city.jpg';
import thumbCubes from './thumb-cubes.jpg';
import thumbSechelt from './thumb-sechelt.jpg';
import Top from '../record/top/top';

class Vr extends Component {
    componentDidMount() {
        window.AFRAME.registerComponent('set-image', {
            schema: {
                on: {type: 'string'},
                target: {type: 'selector'},
                src: {type: 'string'},
                dur: {type: 'number', default: 300}
            },
            init: function () {
                let data = this.data;
                let el = this.el;
                this.setupFadeAnimation();
                el.addEventListener(data.on, function () {
                    data.target.emit('set-image-fade');
                    setTimeout(function () {
                        data.target.setAttribute('material', 'src', data.src);
                    }, data.dur);
                });
            },
            setupFadeAnimation: function () {
                let data = this.data;
                let targetEl = this.data.target;
                if (targetEl.dataset.setImageFadeSetup) { return; }
                targetEl.dataset.setImageFadeSetup = true;
                targetEl.setAttribute('animation__fade', {
                    property: 'material.color',
                    startEvents: 'set-image-fade',
                    dir: 'alternate',
                    dur: data.dur,
                    from: '#FFF',
                    to: '#000'
                });
            }
        });
    }

    render() {
        return (
            <div className="h100 df fdc">
                <Top showMore={this.props.showMore} title="VR" />
                <div style={{
                    flex: '1'
                }}>
                    <a-scene>
                        <a-assets>
                            <img id="city" alt="city" src={city} />
                            <img id="city-thumb" alt="city-thumb" src={thumbCity} />
                            <img id="cubes-thumb" alt="cubes-thumb" src={thumbCubes} />
                            <img id="sechelt-thumb" alt="sechelt-thumb" src={thumbSechelt} />
                            <img id="cubes" alt="cubes" src={cubes} />
                            <img id="sechelt" alt="sechelt" src={sechelt} />
                            <script id="link" type="text/html">
                                <a-entity class="link"
                                          geometry="primitive: plane; height: 1; width: 1"
                                          material="shader: flat; src: ${thumb}"
                                          event-set__1="_event: mousedown; scale: 1 1 1"
                                          event-set__2="_event: mouseup; scale: 1.2 1.2 1"
                                          event-set__3="_event: mouseenter; scale: 1.2 1.2 1"
                                          event-set__4="_event: mouseleave; scale: 1 1 1"
                                          set-image="on: click; target: #image-360; src: ${src}" />
                            </script>
                        </a-assets>
                        <a-sky id="image-360" radius="10" src="#city" />
                        <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
                            <a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb" />
                            <a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb" />
                            <a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb" />
                        </a-entity>
                        <a-entity camera look-controls>
                            <a-cursor id="cursor"
                                      animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
                                      animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
                                      event-set__1="_event: mouseenter; color: springgreen"
                                      event-set__2="_event: mouseleave; color: black"
                                      fuse="true"
                                      raycaster="objects: .link" />
                        </a-entity>
                    </a-scene>
                </div>
            </div>
        );
    }
}

export default Vr;
