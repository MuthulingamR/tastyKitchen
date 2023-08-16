import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {itemDetails} = props
      const {name, id, imageUrl, cost, quantity} = itemDetails
      const totalAmount = quantity * cost

      return (
        <li data-testid="cartItem" className="cart-food-item-li">
          <div className="large-cart-item-container">
            <div className="image-heading-container">
              <img className="item-image-lg" src={imageUrl} alt={name} />
              <h1 className="item-name">{name}</h1>
            </div>
            <div className="item-food-btn">
              <button
                data-testid="decrement-quantity"
                type="button"
                onClick={() => decrementCartItemQuantity(id)}
                className="cart-item-btn"
              >
                -
              </button>
              <p className="food-item-quantity">{quantity}</p>
              <button
                data-testid="increment-quantity"
                type="button"
                onClick={() => incrementCartItemQuantity(id)}
                className="cart-item-btn"
              >
                +
              </button>
            </div>
            <div className="item-price-container">
              <BiRupee className="food-total-amount" />
              <p data-testid="item-quantity" className="food-total-amount">
                {totalAmount}.00
              </p>
            </div>
          </div>
          <img className="item-image" src={imageUrl} alt={name} />
          <div className="sm-item-container">
            <h1 className="item-name">{name}</h1>
            <div className="item-food-btn">
              <button
                data-testid="decrement-quantity"
                type="button"
                onClick={() => decrementCartItemQuantity(id)}
                className="cart-item-btn"
              >
                -
              </button>
              <p className="food-item-quantity">{quantity}</p>
              <button
                data-testid="increment-quantity"
                type="button"
                onClick={() => incrementCartItemQuantity(id)}
                className="cart-item-btn"
              >
                +
              </button>
            </div>
            <div className="item-price-container">
              <BiRupee className="food-total-amount" />
              <p data-testid="item-quantity" className="food-total-amount">
                {totalAmount}.00
              </p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
