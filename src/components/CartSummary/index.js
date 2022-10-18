// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const getPrice = () => {
        const lst = cartList.map(el => el.price * el.quantity)
        console.log(lst)
        let sum = 0
        lst.forEach(el => {
          sum += el
        })
        return sum
      }

      return (
        <div className="summary">
          <h1>
            <span className="total">Order Total:</span>
            {getPrice()}/-
          </h1>
          <p className="itemsInCart">{cartList.length} items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
