import { Action } from '@ngrx/store';

import { CourseInterface } from 'src/app/course_interface';

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export class AddToWishlist implements Action {
  readonly type = ADD_TO_WISHLIST;

  constructor(public payload: CourseInterface) {}
}

export class RemoveFromWishlist implements Action {
  readonly type = REMOVE_FROM_WISHLIST;
  constructor(public payload: CourseInterface){

  }
}
export type WishlistActions = AddToWishlist| RemoveFromWishlist;
