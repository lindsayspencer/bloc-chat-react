import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      console.log(snapshot);
      const message = snapshot.val();
      message.key = snapshot.key;
      // concat() is used instead of push() so as not to directly alter state
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }
  // .equalTo(this.props.activeRoom)
  render(){
    return(
      <section className="message-list">
      {this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
        <div className="message-data" key={index}>
          <div>{message.content}</div>
          <div>Sent by {message.username} at {message.sentAt}</div>
          </div>)}
      </section>
    );
  }
}

export default MessageList;
