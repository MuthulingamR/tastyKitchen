import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  onClickAdd = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.onAddCartItem,
    )
  }

  onAddCartItem = () => {
    const {foodDetails, addCartItem} = this.props
    const {quantity} = this.state
    addCartItem({...foodDetails, quantity})
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state

    if (quantity > 0) {
      this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.onAddCartItem,
      )
    }
  }

  onIncrementQuantity = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.onAddCartItem,
    )
  }

  render() {
    const {quantity} = this.state
    const {foodDetails} = this.props
    const {cost, name, imageUrl, rating} = foodDetails

    return (
      <li data-testid="foodItem" className="food-item-container">
        <img src={imageUrl} alt="food item" className="food-image" />
        <div>
          <h1 className="food-name">{name}</h1>
          <div className="food-rate-container">
            <BiRupee className="food-rupee" />
            <p className="food-item-cost">{cost}.00</p>
          </div>
          <div className="food-rate-container">
            <AiFillStar className="food-icon" />
            <p className="food-item-rating">{rating}</p>
          </div>
          {quantity === 0 ? (
            <button
              type="button"
              onClick={this.onClickAdd}
              className="food-add-btn"
            >
              ADD
            </button>
          ) : (
            <div className="food-item-add-btn-container">
              <button
                data-testid="decrement-count"
                type="button"
                onClick={this.onDecrementQuantity}
                className="food-item-btn"
              >
                -
              </button>
              <p data-testid="active-count" className="food-item-quantity">
                {quantity}
              </p>
              <button
                data-testid="increment-count"
                type="button"
                onClick={this.onIncrementQuantity}
                className="food-item-btn"
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
