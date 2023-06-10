import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686142090/Group_d2pk3p.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-fond-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="not-found-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
