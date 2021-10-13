import * as WishlistActions from 'src/app/course/wishlist/store/wishlist.actions'

const initialState = {
  wishlist : []
};

export function wishlistReducer(
  state = initialState,
  action: WishlistActions.WishlistActions
) {
  switch (action.type) {
    case WishlistActions.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case WishlistActions.REMOVE_FROM_WISHLIST:
      const updatedWishlist = state.wishlist.filter(course=> course.id !== action.payload.id)
      console.log(updatedWishlist);
      console.log(state.wishlist);
      return {
        ...state,
        wishlist: updatedWishlist
      }
    default:
      return state;
  }
}
