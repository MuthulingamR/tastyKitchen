import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/djxakd7bv/image/upload/v1686383339/cooking_1empty_u1vw9z.png"
      alt="empty cart"
      className="empty-image"
    />
    <h1 className="empty-heading">No Order Yet!</h1>
    <p className="empty-para">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="empty-cart-btn ">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
