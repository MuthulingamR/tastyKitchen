import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686290181/Group_7420footer_kq20ml.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchen</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icon-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="footer-icon"
      />
      <FaInstagram testid="instagram-social-icon" className="footer-icon" />
      <FaTwitter testid="twitter-social-icon" className="footer-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="footer-icon" />
    </div>
  </div>
)

export default Footer
