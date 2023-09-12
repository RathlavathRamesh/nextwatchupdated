import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content nav-menu">
        <Link to="/">
          <li>
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="website logo"
            />
          </li>
        </Link>
        <div className="right">
          <Link to="/">
            <li>
              <img
                className="profile-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </li>
          </Link>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
