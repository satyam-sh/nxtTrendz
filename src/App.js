import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(el => el.id !== id),
    }))
  }

  addQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(el => {
        if (el.id === id) {
          return {...el, quantity: el.quantity + 1}
        }
        return el
      }),
    }))
  }

  decreaseQty = id => {
    const {cartList} = this.state
    const item = cartList.find(el => el.id === id)
    if (item.quantity === 1) {
      this.setState(prev => ({
        cartList: prev.cartList.filter(el => el.id !== id),
      }))
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(el => {
          if (el.id === id) {
            if (el.quantity > 1) {
              return {...el, quantity: el.quantity - 1}
            }
          }

          return el
        }),
      }))
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const sameItem = cartList.find(each => each.id === product.id)
    if (sameItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(el => {
          if (el.id === product.id) {
            return {...el, quantity: el.quantity + 1}
          }
          return el
        }),
      }))
    }

    //   TODO: Update the code here to implement addCartItem "DONE"
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.addQuantity,
          decrementCartItemQuantity: this.decreaseQty,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
