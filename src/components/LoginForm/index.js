import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
// import {withRouter} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errormsg: '',
    showpassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showError: true, errormsg: errorMsg})
  }

  showpassword = () => {
    const {showpassword} = this.state
    this.setState({showpassword: !showpassword})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password, showpassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        {!showpassword && (
          <input
            type="password"
            id="password"
            className="username-input-filed"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
        )}
        {showpassword && (
          <input
            type="text"
            id="password"
            className="username-input-filed"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
        )}
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {errormsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            alt="website logo"
            className="webLogo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="check">
            <input
              type="checkbox"
              id="ShowPassword"
              onChange={this.showpassword}
            />
            <label htmlFor="ShowPassword">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-message">*{errormsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
