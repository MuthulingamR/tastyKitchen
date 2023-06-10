import {Link} from 'react-router-dom'
import './index.css'

const PlaceOrder = () => (
  <div className="place-order-container">
    <img
      src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686393472/check-circle.1_1success_opvctl.png"
      alt="success"
    />
    <h1 className="success-heading">Payment Successful</h1>
    <p className="para-success">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/">
      <button type="button" className="home-btn-success">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default PlaceOrder
