import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PhaserWorld from './components/PhaserWorld';
import LabPage from './pages/LabPage';
import EcosystemPage from './pages/EcosystemPage';


function App() {
  return (
    <Router>
      <>
        <Navigation />
        {/* < PhaserWorld width={800} height={600} worldType="Ecosystem"/> */}
        {/* < PhaserWorld width={900} height={600} worldType="Shaderfun"/> */}
        {/* < PhaserWorld /> */}
        <Switch>
          <Route exact path='/'> <h1>Welcome</h1> </Route>
          <Route exact path='/lab' component={LabPage} />
          <Route exact path='/ecosystem' component={EcosystemPage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
