import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/CartContext'

import './index.css'

const OrderSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, onClickPlaceOrder} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="summary-total">Order Total:</h1>
            <div className="summary-rupee-container">
              <BiRupee className="summary-rupee-icon" />
              <h1 data-testid="total-price" className="summary-total">
                {total}.00
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onClickPlaceOrder()}
            className="summary-btn"
          >
            Place Order
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default OrderSummary
