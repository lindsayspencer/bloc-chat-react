import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
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
  handleMessageChange(e){
    this.setState({newMessage: e.target.value});
  }
  createMessage(e){
    e.preventDefault();
    const newText = this.state.newMessage;
    this.messagesRef.push({ content: newText, username: this.props.currentUser.displayName, roomId: this.props.activeRoom, sentAt: this.props.firebase.database.ServerValue.TIMESTAMP });
    this.setState({ newMessage: ""});
  }
  render(){
    return(
      <section className="message-list">
      {this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
        <div className="message-data" key={index}>
          <div>{message.content}</div>
          <div>Sent by {message.username} at {message.sentAt}</div>
          </div>)}
          <form onSubmit={(e) => this.createMessage(e)} className="message-create-form">
            <label for="message-create-text">New Message</label>
            <input type="text" className="message-create-text" value={this.state.newMessage} onChange={(e) => this.handleMessageChange(e)} />
            <input type="submit" className="message-create-submit" />
          </form>
      </section>
    );
  }
}

export default MessageList;
