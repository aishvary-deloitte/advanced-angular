import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseInterface } from 'src/app/course_interface';
import { CourseService } from '../../course.service';
import { AddToCart } from '../cart/store/cart.actions';
import { cartListReducer } from '../cart/store/cart.reducer';
import { RemoveFromWishlist } from './store/wishlist.actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  courseService : CourseService;
  courses : CourseInterface[];
  cartItems : CourseInterface[];
  wishlist: CourseInterface[]

  constructor(service: CourseService,  private store: Store<{ cartList: { cart:CourseInterface[] }, wishlistItems: {wishlist: CourseInterface[]}}>) {
    this.courseService = service;
    this.courses = [];
  this.cartItems = [];
  this.wishlist = [];
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data:any)=>{
      this.courses = data.courses;
      console.log(this.courses);
    })

    this.store.select('cartList').subscribe((data)=>{
      console.log(data.cart);
      this.cartItems = data.cart;
    })
    this.store.select('wishlistItems').subscribe((data)=>{
      console.log("wishlist", this.wishlist)
      this.wishlist = data.wishlist;
    })
  }

  AddToCart (element:CourseInterface) {
    if (!this.cartItems.some(course=> course.id === element.id)) {
      this.store.dispatch(new AddToCart(element));
    }
    else {
    }
  }

  getDiscountedPrice(e) {
    return this.courseService.getDiscountedPrice(e);
  }


  RemoveFromWishlist(element:CourseInterface) {
    if (this.wishlist.some(course=> course.id === element.id)) {
      this.store.dispatch(new RemoveFromWishlist(element));
    }
    else {
    }
  }
  getTotalCartValue () {
    var s = 0
    this.cartItems.forEach(course=>{
      s = s + this.getDiscountedPrice(course);
    })
    return s;
  }
  getOriginialPrice(course) {
    return this.courseService.getOriginialPrice(course);
  }
  calculateStyle(e) {
    return this.courseService.calculateStyle(e);
  }
  CurrentCourseUpdate(course_id) {
    return this.courseService.CurrentCourseUpdate(course_id);
  }
}
