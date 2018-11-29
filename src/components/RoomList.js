import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: []
    };
    // ref to firebase, used to CRUD items at that path on the db
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  // can be used to iniitiate requests, like to our db
  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      // concat() is used instead of push() so as not to directly alter state
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }
  componentWillUnmount(){

  }
  render() {
    return (
      <section className="room-list">
      <h2>Available Chat Rooms</h2>
        {this.state.rooms.map( (room) => <div className="room-data">{room.name}</div>)}
      </section>
    );
  }
}


export default RoomList;
