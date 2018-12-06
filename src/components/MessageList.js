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

    this.messagesRef.on('child_changed', snapshot => {
      const newMessages = this.state.messages;
      const messageToChange = this.state.messages.find(function(message) {
        return message.key === snapshot.key;
      });
      const messageIndex = newMessages.indexOf(messageToChange);
      console.log(messageIndex);
      const updatedMessage = snapshot.val();
      newMessages[messageIndex] = updatedMessage;
      updatedMessage.key = snapshot.key;
      this.setState({ messages: newMessages });
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
  deleteMessage(message){
    const deleted = message.key;
    console.log(deleted);
    this.messagesRef.child(deleted).remove();
    const newList = this.state.messages.filter(x => x.key !== deleted);
    console.log(newList);
    this.setState({messages: newList});
  }
  editMessage(message){
    const index = this.state.messages.indexOf(message);
    const editedMessage = this.state.messages[index];
    // to test that I found the correct index
    console.log(editedMessage);
    // to view the properties of the data at that index
    console.log(this.state.messages[index]);
    const editedText = prompt("New Message Text: ");
    this.messagesRef.child(message.key).update({content: editedText});
  }
  render(){
    return(
      <section className="message-list">
      {this.state.messages.filter(message => message.roomId===this.props.activeRoom).map( (message, index) =>
        <div className="message-data" key={index}>
          <div>{message.content}</div>
          <div>Sent by {message.username} at {message.sentAt}</div>
          <button className="message-edit" onClick={() => this.editMessage(message)}>Edit</button>
          <button className="message-delete" onClick={() => this.deleteMessage(message)}>Delete</button>
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
