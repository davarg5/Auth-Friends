import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import FriendsList from './components/FriendsList';

import PrivateRoute from './components/PrivateRoute';


function App() {


  return (
    <Router>
      <div className="App">
        
        <Link to='/login'>Login</Link>

        <Link to='/protected'>Protected Page</Link>



        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/protected' component={FriendsList} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
