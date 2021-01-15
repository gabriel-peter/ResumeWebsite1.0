import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavbarHeader from './components/nav/nav';
import Footer from './components/footer/footer';
import Spotify_Previewer from './components/spotify_comparer/spotify';
import AboutMe from './components/aboutMe/aboutMe';
import MixAssist from './components/mixAssist/mixAssist';
import LoginPage from './components/mixAssist/login/loginPage';
import SignUpPage from './components/mixAssist/signup/signupPage';
import MenuPages from './components/mixAssist/menuPages';

// https://medium.com/@the.benhawy/3-ways-to-create-react-components-8b3620e4ea0
function App () {
    return (
      <div className="App">
        <Router>
          <NavbarHeader/>
          <div className='site-body'>
          <Switch>
            <Route path='/' exact component={AboutMe}/>
            <Route path='/mix' exact component={MenuPages}/>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/signup' exact component={SignUpPage}/>
            <Route path='/spotify' component={Spotify_Previewer}/>
          </Switch>
          <Footer/>
          </div>
        </Router>
      </div>
    );
}


export default App;
