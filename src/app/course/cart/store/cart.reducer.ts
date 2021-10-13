import * as CartActions from 'src/app/course/cart/store/cart.actions'

const initialState = {
  cart : []
};

export function cartListReducer(
  state = initialState,
  action: CartActions.CartActions
) {
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case CartActions.REMOVE_FROM_CART:
      const updatedCart = state.cart.filter(course=> course.id !== action.payload.id)
      return {
        ...state,
        cart: updatedCart
      }
    default:
      return state;
  }
}
