import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {showErrorMsg: false, username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div className="login-mobile-container">
          <div className="heading-image-container ">
            <h1 className="login-heading">Login</h1>
            <img
              src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686116591/Rectangle_1457_u5qbqo.png"
              alt="egg"
              className="egg-image"
            />
          </div>
          <form onSubmit={this.submitForm} className="mobile-form-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              value={username}
              className="input-field"
              id="username"
            />
            <label htmlFor="password">password</label>
            <input
              type="password"
              onChange={this.onChangePassword}
              className="input-field"
              value={password}
              id="password"
            />
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        <div className="login-desktop-view">
          <div className="login-desktop-inner-container">
            <form
              onSubmit={this.submitForm}
              className="login-desktop-form-container"
            >
              <img
                src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686128156/Group_7420_gk2n7t.png"
                alt="website logo"
              />
              <h1 className="website-heading">Tasty Kitchens</h1>
              <h1 className="desktop-login-heading">Login</h1>
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                onChange={this.onChangeUsername}
                value={username}
                className="input-field"
                id="username"
              />
              <label htmlFor="password">password</label>
              <input
                type="password"
                onChange={this.onChangePassword}
                className="input-field"
                value={password}
                id="password"
              />
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
          <img
            className="website-image"
            src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686124481/Rectangle_1456_yrwdal.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
