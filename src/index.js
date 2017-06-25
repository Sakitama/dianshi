import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

function addEvent (element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent(`on${type}`, handler);
    } else {
        element[`on${type}`] = handler;
    }
}

let width = 0;

addEvent(window, 'load', () => {
    width = document.body.clientWidth || document.documentElement.clientWidth;
});

addEvent(window, 'resize', () => {
    let newWidth = document.body.clientWidth || document.documentElement.clientWidth;
    if (width !== newWidth) {
        window.location.reload();
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
