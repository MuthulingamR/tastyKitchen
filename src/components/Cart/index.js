import {Component} from 'react'
import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCart'
import CartContext from '../../Context/CartContext'
import PlaceOrder from '../PlaceOrder'

import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartData')),
    placeOrder: false,
  }

  onClickPlaceOrder = () => {
    this.setState({placeOrder: true})
  }

  addToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const foodObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (foodObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList}, this.addToLocalStorage)
  }

  renderCartList = () => {
    const {cartList} = this.state
    return (
      <>
        {cartList.length > 0 ? (
          <>
            <CartListView />
          </>
        ) : (
          <EmptyCartView />
        )}
      </>
    )
  }

  render() {
    const {cartList, placeOrder} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          placeOrder,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          onClickPlaceOrder: this.onClickPlaceOrder,
        }}
      >
        <Header />
        <div className="cart-container">
          <div className="cart-inner-container">
            {placeOrder ? <PlaceOrder /> : this.renderCartList()}
          </div>
        </div>
        <Footer />
      </CartContext.Provider>
    )
  }
}

export default Cart
