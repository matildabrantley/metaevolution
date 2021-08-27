import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PhaserWorld from './components/PhaserWorld';


function App() {
  return (
    <Router>
      <>
        <Navigation />
        < PhaserWorld />
        <Switch>
          {/* { <Route exact path='/'>< PhaserWorld /> </Route> } */}
          {/* <Route exact path='/fillerPage' component={} /> */}
          <Route render={() => <h1>Not a page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
