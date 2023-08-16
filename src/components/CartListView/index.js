import CartItem from '../CartItem'
import OrderSummary from '../OrderSummary'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="food-cart-ul-list">
          <div className="ul-title-container">
            <li>Item</li>
            <li>Quantity</li>
            <li>Price</li>
          </div>

          {cartList.map(each => (
            <CartItem itemDetails={each} key={each.id} />
          ))}
          <hr />
          <OrderSummary />
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
