import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  renderSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailureView = error => {
    this.setState({showError: true, errorMessage: error})
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    console.log(data)

    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  usernameChangeHandler = e => {
    this.setState({username: e.target.value})
  }

  passwordChangeHandler = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, errorMessage, showError} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595093/Rectangle_1467_l1idug.png"
          alt="website logo"
          className="login-page-image"
        />
        <img
          src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595083/Ellipse_99_azbuev.png"
          alt="website logo"
          className="mobile-logo"
        />
        <form onSubmit={this.onFormSubmit} className="form-container">
          <div className="form-logo-container">
            <img
              src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595152/Group_7730_kxoon8.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="website-name">ook Hub</p>
          </div>
          <div className="username-container">
            <label htmlFor="username" className="label">
              Username*
            </label>
            <br />
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="user-input"
              onChange={this.usernameChangeHandler}
              value={username}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password" className="label">
              Password*
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="user-input"
              onChange={this.passwordChangeHandler}
              value={password}
            />
            {showError && <p className="error-message">*{errorMessage}</p>}
          </div>
          <div className="login-button-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
