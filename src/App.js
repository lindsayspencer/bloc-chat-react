import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

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
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
    }
  }
  changeRoom(room){
    console.log(room.key);
    this.setState({ activeRoom: room.key });
    }
  render() {
    return (
      <div className="App">
        <section className="room-list">
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} changeRoom={(room) => this.changeRoom(room)} />
        </section>
        <section className="message-list">
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </section>
      </div>
    );
  }
}

export default App;
