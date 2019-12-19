import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/nav/nav';
import Resume from './components/resume/resume';
import Footer from './components/footer/footer';
import Spotify_Previewer from './components/spotify_previewer/spotify_previewer';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <div className='site-body'>
        <Switch>
          <Route path='/' exact component={Resume}/>
          <Route path='/spotify' component={Spotify_Previewer}/>
          <Route path='/somethingelse' component={Spotify_Previewer}/>
        </Switch>
        <Footer/>
        </div>
      </Router>
    </div>

  );
}

export default App;
