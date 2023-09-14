import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <div className="website-logo-container">
          <img
            src="https://res.cloudinary.com/dky69roxl/image/upload/v1694595152/Group_7730_kxoon8.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="website-name">ook Hub</p>
        </div>
      </Link>
      <ul className="nav-items-list-container">
        <li className="nav-item">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shelf" className="link">
            Bookshelves
          </Link>
        </li>
        <li>
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
