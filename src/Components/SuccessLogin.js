import React, {Component} from 'react';
import '../Gaya/successlogin.css'

export default class SuccessLogin extends Component {
  render(){
    return(
      <div style={{paddingTop: '30px'}}>
        <div className='sl-body'>
          <p className='sl-header-title'>Thank you for participating!</p>
        </div>
        <div className='sl-button'>
          <button className='sl-logout'>Logout</button>
        </div>
      </div>
    )
  }
}
