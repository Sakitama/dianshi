import React, {Component} from 'react';
import Navigation from './navigation/navigation';
import './App.css';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Channel from './channel/channel';
import Newest from './newest/newest';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Newest} />
                        <Route path="/channel" component={Channel} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
