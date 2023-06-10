import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  placeOrder: false,
  onClickPlaceOrder: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
})

export default CartContext
