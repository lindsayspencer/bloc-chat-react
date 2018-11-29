import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQWK-YfwNPpeuEIj-U-4CaPxZbGHRXmpQ",
    authDomain: "bloc-chat-244c8.firebaseapp.com",
    databaseURL: "https://bloc-chat-244c8.firebaseio.com",
    projectId: "bloc-chat-244c8",
    storageBucket: "bloc-chat-244c8.appspot.com",
    messagingSenderId: "21978993227"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
