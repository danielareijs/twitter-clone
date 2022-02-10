import React from 'react';
import './index.css';
import Header from './components/Header';
import Tweets from './components/Tweets';
import UserTweets from './components/UserTweets';
import Login from './components/Login';
import Logout from './components/Logout';
import { HashRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render(){

    return (
      <HashRouter>
        <div className="App">
          <Header />
          
          <h2></h2>
          <Switch>
            <Route path="/" exact component={Tweets} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/tweets/:username" component={UserTweets} />
          </Switch>
          </div>
      </HashRouter>
    );
  }
}

export default App;
