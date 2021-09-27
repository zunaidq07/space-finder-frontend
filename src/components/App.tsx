import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import { Login } from '../components/Login';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { Home } from './Home';
import { Profile } from './Profile';
import { Navbar } from './Navbar';
import Spaces from "../components/spaces/Spaces";
import { DataService } from '../services/DataService';

interface AppState{
  user: User | undefined
}

export class App extends React.Component<{}, AppState>{

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined
    }
    // this.setUser = this.setUser.bind(this);
  }

  private authService : AuthService = new AuthService();

  private dataService: DataService = new DataService();

  private setUser = (user: User) => {
    this.setState({
      user: user
    })
    console.log('setting the state of user', this.state.user)
  }
  render(){
    return(
      <div className="wrapper">
        <Router history={history}>
          <div>
            <Navbar user={this.state.user}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile">
                <Profile authService={this.authService} user={this.state.user}/>
              </Route> 
              <Route exact path="/login">
                <Login authorService={this.authService} setUser={this.setUser} />
              </Route>
              <Route exact path="/spaces">
                  <Spaces dataService={this.dataService} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
