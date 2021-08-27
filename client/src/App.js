import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import PhaserWorld from './components/PhaserWorld';


function App() {
  return (
    <Router>
      <>
        <Navigation />
        < PhaserWorld width={200} height={150} worldType="Colorfun"/>
        < PhaserWorld width={300} height={200} worldType="Colorfun"/>
        < PhaserWorld width={800} height={600} worldType="Ecosystem"/>
        < PhaserWorld width={900} height={600} worldType="Shaderfun"/>
        {/* < PhaserWorld /> */}
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
