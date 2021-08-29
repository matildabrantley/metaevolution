import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PhaserWorld from './components/PhaserWorld';
import LabPage from './pages/LabPage';
import EcosystemPage from './pages/EcosystemPage';
import GamePage from './pages/GamePage';


function App() {
  return (
    <Router>
      <>
        <Navigation />
        <Switch>
          <Route exact path='/'> <h1>Welcome</h1> </Route>
          <Route exact path='/ecosystem' component={EcosystemPage} />
          <Route exact path='/lab' component={LabPage} />
          <Route exact path='/game' component={GamePage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
