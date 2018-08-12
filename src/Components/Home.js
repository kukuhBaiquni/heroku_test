import React, {Component} from 'react';
import '../Gaya/home.css';
import '../Gaya/loader.css';
import LatestVisitor from './LatestVisitor'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux';
import {trigger, getData, parseUserToken} from '../actions/Saga';
import logoutAttempt from '../actions/Saga';
import Chatbox from './Chatbox';

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
      chatFetch: true,
      authenticate: false,
      isLogin: false
    }
  }

  responseFacebook = (response) => {
    if (response.name) {
      this.setState({
        facebookImage: response.picture.data.url,
        facebookName: response.name,
        facebookId: Date.now(),
      })
    }else{
      this.setState({fProcessing: false})
      clearInterval(this.timer)
    }
  }

  responseGoogle = (response) => {
    if (response.profileObj.name) {
      this.setState({
        googleId: Date.now(),
        googleImage: response.profileObj.imageUrl,
        googleName: response.profileObj.name,
      })
    }else{
      this.setState({gProcessing: false})
      clearInterval(this.timer)
    }
  }

  componentDidMount(){
    var user = localStorage.getItem('token')
    if (user) {
      this.props.dispatch(parseUserToken(user))
      this.setState({authenticate: true})
      this.timer = setInterval(() => this.tickAuth(), 1000)
    }
    this.props.dispatch(getData())
  }

  tickAuth(){
    if (this.props.status.isLogin) {
      this.setState({authenticate: false, isLogin: true})
      clearInterval(this.timer)
    }
  }

  GstartP(){
    this.timer = setInterval(() => this.tickG(), 1000)
    this.setState({gProcessing: true, provider: 'Google'})
  }

  tickG(){
    if (this.state.googleId !== '') {
      let data = {
        id: this.state.googleId,
        name: this.state.googleName,
        image: this.state.googleImage,
        provider: this.state.provider
      }
      this.props.dispatch(trigger(data))
      this.setState({gProcessing: false, isLogin: true})
      clearInterval(this.timer)
    }
  }

  FstartP(){
    this.timer = setInterval(() => this.tickF(), 1000)
    this.setState({fProcessing: true, provider: 'Facebook'})
  }

  tickF(){
    if (this.state.facebookId !== '') {
      let data = {
        id: this.state.facebookId,
        name: this.state.facebookName,
        image: this.state.facebookImage,
        provider: this.state.provider,
      }
      this.props.dispatch(trigger(data))
      this.setState({fProcessing: false, isLogin: true})
      clearInterval(this.timer)
    }
  }

  takeMeOut(){
    this.setState({isLogin: false})
    logoutAttempt()
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <div className='home-body'>
          <h1 className='home-header-title'>Whats App Prototype</h1>
        </div>
        {
          this.state.authenticate &&
          <div className='loader-wrapper'>
            <div className='loader2 init'></div>
          </div>
        }
        {
          this.state.isLogin
          ?
          <div style={{display: this.state.authenticate ? 'none' : 'block'}} className='h-logged'>
            <div className='h-user'>
              <div className='h-wrapper'>
                <div className='h-image'></div>
                <div className='h-stacker'>
                  <h1 className='h-username'><b>{this.props.user.user.name}</b></h1>
                  <p className='h-via'>{this.props.user.user.provider}</p>
                </div>
                <div onClick={this.takeMeOut.bind(this)} className='h-logout'>
                  <span className='glyphicon glyphicon-log-out' id='icoon'></span>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{display: this.state.authenticate ? 'none' : 'block'}} className='button-wrapper'>
            <div className='button-section'>
              <FacebookLogin
                appId="298616737366486"
                redirectUri='https://oauth-gb-app.herokuapp.com/'
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.FstartP.bind(this)}
                callback={this.responseFacebook.bind(this)}
                cssClass='btn btn-facebook'
                icon={this.state.fProcessing ? <div className='loader facebook'></div> : null}
                />
              <h1 className='or'>Or</h1>
              <GoogleLogin
                clientId="1078551248827-0q3erc67gcvjbja8tuqv428bh7uepgln.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle.bind(this)}
                className='btn btn-google'
                onRequest={this.GstartP.bind(this)}
                />
              {
                this.state.gProcessing &&
                <div className='loader google'></div>
              }
            </div>
          </div>
        }
        <Chatbox />
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
