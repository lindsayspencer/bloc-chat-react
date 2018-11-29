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
      console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      // concat() is used instead of push() so as not to directly alter state
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }
  componentWillUnmount(){

  }
  createRoom(e){
    const newRoomName = e.target.value;
    this.roomsRef.push({
      name: newRoomName
    });
  }
  // handleSubmit(e){
  //   e.preventDefault();
  //   if (!this.state.newRoomName) { return };
  //   // adds newTodo to the end of the todos array, and resets newTodoDescription input to blank
  //   this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: "" });
  // }
  }
  render() {
    return (
      <section className="room-list">
      <h2>Available Chat Rooms</h2>
        {this.state.rooms.map( (room) => <div className="room-data">{room.name}</div>)}
        <form onSubmit={(e) => this.createRoom(e)} className="room-create-form">
          <input type="text" className="room-create-text" />
          <input type="submit" className="room-create-submit" />
        </form>

      </section>
    );
  }
}


export default RoomList;
