import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';


function App() {
  return (
    <Router>
      <>
        <Navigation />
        <Switch>
          {/* <Route exact path='/' component={} /> */}
          {/* <Route exact path='/fillerPage' component={} /> */}
          <Route render={() => <h1>Not a page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
