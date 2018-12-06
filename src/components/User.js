import React, { Component } from 'react';

class User extends Component {
  componentDidMount(user){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }
  signUserIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }
  signUserOut(){
    this.props.firebase.auth().signOut();
  }
  render() {
    return (
      <section className="user-handling">
        <div className="user-display">You are currently logged in as {
          this.props.currentUser ? this.props.currentUser.displayName : "Guest" }</div>
          <button onClick={() => this.signUserIn()}>Sign In</button>
          <button onClick={() => this.signUserOut()}>Sign Out</button>
      </section>
    );
  }
}

export default User;
