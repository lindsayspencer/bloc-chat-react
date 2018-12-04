import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    // ref to firebase, used to CRUD items at that path on the db
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  // can be used to iniitiate requests, like to our db
  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      // concat() is used instead of push() so as not to directly alter state
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }
  componentWillUnmount(){

  }
  handleChange(e){
    this.setState({newRoomName: e.target.value});
  }
  createRoom(e){
    e.preventDefault();
    const newName = this.state.newRoomName;
    this.roomsRef.push({ name: newName });
    this.setState({ newRoomName: ""});
  }
  deleteRoom(room){
    const deleted = room.key;
    console.log(room.key);
    this.roomsRef.child(deleted).remove();
    const newList = this.state.rooms.filter(x => x.key !== deleted);
    console.log(newList);
    this.setState({rooms: newList});
  }
  render() {
    return (
      <section className="room-list">
      <h2>Available Chat Rooms</h2>
        {this.state.rooms.map( (room) =>
          <div className="room-data" key={room.key}>
            <span onClick={() => this.props.changeRoom(room)} style={room.key===this.props.activeRoom ? {textDecoration:"underline"} : {textDecoration:"none"}}>{room.name}</span>
            <button className="room-delete" onClick={() => this.deleteRoom(room)}>Delete</button>
          </div>
          )}
        <form onSubmit={(e) => this.createRoom(e)} className="room-create-form">
          <label for="room-create-text">New Chat Room</label>
          <input type="text" className="room-create-text" name="room-create-text" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)} />
          <input type="submit" className="room-create-submit" />
        </form>
      </section>
    );
  }
}


export default RoomList;
