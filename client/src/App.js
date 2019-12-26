import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/nav/nav';
import Popup from './components/modal/modal';
import Resume from './components/resume/resume';
import Footer from './components/footer/footer';
// import Spotify_Previewer from './components/spotify_comparer/client_spotify_data';
import Spotify_Previewer from './components/spotify_comparer/spotify';

function App() {
  return (
    <div className="App">
      <Router>
      {/* <Popup  
          text='Click "Close Button" to hide popup'  
/>   */}
        <Nav/>
        <div className='site-body'>
        <Switch>
          {/* <Route path='/' exact component={Resume}/> */}
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
