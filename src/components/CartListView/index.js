import CartItem from '../CartItem'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="food-cart-ul-list">
          {cartList.map(each => (
            <CartItem itemDetails={each} key={each.id} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
