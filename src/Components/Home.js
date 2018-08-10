import React, {Component} from 'react';
import '../Gaya/home.css';
import '../Gaya/loader.css';
import LatestVisitor from './LatestVisitor'
import request from 'superagent';
import {SERVER_URL} from '../config'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import {trigger, getData} from '../actions/Saga'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      facebookId: '',
      facebookImage: '',
      facebookName: '',
      googleId: '',
      googleImage: '',
      googleName: '',
      provider: '',
      fProcessing: false,
      gProcessing: false,
    }
  }

  responseFacebook = (response) => {
    console.log(response.status);
    if (response.status !== '') {
      this.setState({
        facebookImage: response.picture.data.url,
        facebookName: response.name,
        facebookId: response.userID,
      })
    }else{
      this.setState({fProcessing: false})
      clearInterval(this.timer)
    }
  }

  responseGoogle = (response) => {
    this.setState({
      googleId: response.profileObj.googleId,
      googleImage: response.profileObj.imageUrl,
      googleName: response.profileObj.name,
    })
  }

  componentDidMount(){
    this.props.dispatch(getData())
  }

  GstartP(){
    console.log('master');
  }

  FstartP(){
    this.timer = setInterval(() => this.tickF(), 1000)
    this.setState({fProcessing: true})
  }

  tickF(){
    if (this.state.facebookId !== '') {
      let data = {
        id: this.state.facebookId,
        name: this.state.facebookName,
        image: this.state.facebookImage,
      }
      this.props.dispatch(trigger(data))
      this.setState({fProcessing: false})
      clearInterval(this.timer)
    }
  }

  render(){
    return(
      <div>
        <div className='home-body'>
          <h1 className='home-header-title'>Guest Book App</h1>
        </div>
        <div className='button-wrapper'>
          <div className='button-section'>
            <FacebookLogin
              appId="298616737366486"
              autoLoad={false}
              fields="name,email,picture"
              onClick={this.FstartP.bind(this)}
              callback={this.responseFacebook.bind(this)}
              cssClass='btn btn-facebook'
              icon={this.state.fProcessing ? <div className='loader facebook'></div> : null}
              />
            <h1 className='or'>Or</h1>
            <GoogleLogin
              clientId="1078551248827-nhrd5pngljqmg4ng043rctbe8p369q6a.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle.bind(this)}
              className='btn btn-google'
              onRequest={this.GstartP.bind(this)}
              />
          </div>
        </div>
        <LatestVisitor data={this.props.data} />
        <div className='footer'>
          <div className='footer-wrapper'>
            <p className='footer-content'>Don't worry, we do not ask Facebook and Google to tell us your sensitive information eg. password.</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return dispatch
}

export default connect(
  mapDispatchToProps
)(Home)
