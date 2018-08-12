import React, { Component } from 'react';
import '../Gaya/chatbox.css';
import io from 'socket.io-client';

export default class Chatbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      chat: '',
      time: null,
    }
  }

  sendChat(e){
    var socket = io('http://localhost:3001')
    e.preventDefault()
    socket.emit('data', {
      name: 'Gabon',
      chat: 'Lord Gabon is the Best',
      time: Date.now()
    })
    socket.on('data', function(data){
      console.log('pppp',data);
    })
  }

  render(){
    return(
      <div className='cb-body'>
        <div className='cb-ui-wrapper'>
          <div className='cb-content'>
            <div className='cb-header'>
              <p className='cb-title'><b>Chat Box</b></p>
            </div>
            <div className='cb-area'>
              <div className='cb-content'>
                <div className='cb-chat'>
                  <div className='cb-user'></div>
                  <div className='cb-stacker'>
                    <h1 className='cb-name'><b>Master Gabon</b></h1>
                    <p className='cb-content-chat'>1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='cb-write'>
              <form onSubmit={this.sendChat.bind(this)}>
                <input value={this.state.chat} onChange={(e) => this.setState({chat: e.target.value})} className='cb-type' placeholder='ketik obrolan..' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
