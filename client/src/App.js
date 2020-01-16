import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Resume from './components/resume/resume'
import Spotify_Previewer from './components/spotify_comparer/spotify';
import AboutMe from './components/aboutMe/aboutMe'
// https://medium.com/@the.benhawy/3-ways-to-create-react-components-8b3620e4ea0
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <div className='site-body'>
        <Switch>
          <Route path='/' exact component={Resume}/>
          <Route path='/more' exact component={Resume}/>
          <Route path='/spotify' component={Spotify_Previewer}/>
        </Switch>
        <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
