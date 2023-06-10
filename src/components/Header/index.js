import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {match} = props
  const {path} = match
  const activePath1 = path === '/' ? 'active-head-para' : ''
  const activePath2 = path === '/cart' ? 'active-head-para' : ''

  return (
    <nav className="nav-header">
      <div className="nva-content">
        <div className="nav-bar-mobile-logo-container">
          <Link className="image-logo-container" to="/">
            <img
              src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686128156/Group_7420_gk2n7t.png"
              alt="website logo"
            />
            <h1 className="header-heading">Tasty Kitchen</h1>
          </Link>
          <Popup
            modal
            className="popup-content"
            trigger={
              <button type="button" className="empty-btn">
                <GiHamburgerMenu color="#231F20" size={22} />
              </button>
            }
          >
            {close => (
              <div className="popup-container">
                <div className="popup-nav-link-container">
                  <Link className="mobile-nav-link" to="/">
                    <p className={`head-para ${activePath1}`}>Home</p>
                  </Link>
                  <Link className="mobile-nav-link" to="/cart">
                    <p className={`head-para ${activePath2}`}>Cart</p>
                  </Link>
                  <button
                    className="logout-btn"
                    onClick={onClickLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
                <button
                  className="empty-btn"
                  onClick={() => close()}
                  type="button"
                >
                  <IoMdCloseCircle size={20} />
                </button>
              </div>
            )}
          </Popup>
        </div>
        <div className="nav-bar-large-container">
          <Link className="image-logo-container" to="/">
            <img
              src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686128156/Group_7420_gk2n7t.png"
              alt="website logo"
            />
            <h1 className="header-heading">Tasty Kitchen</h1>
          </Link>
          <div className="large-nav-bar-link-container">
            <Link className="mobile-nav-link" to="/">
              <p className={`head-para ${activePath1}`}>Home</p>
            </Link>
            <Link className="mobile-nav-link" to="/cart">
              <p className={`head-para ${activePath2}`}>Cart</p>
            </Link>
            <button
              className="logout-btn"
              onClick={onClickLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
