import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseInterface } from 'src/app/course_interface';
import { CourseService } from '../../course.service';
import { AddToWishlist, RemoveFromWishlist } from '../wishlist/store/wishlist.actions';
import { AddToCart, RemoveFromCart } from './store/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  courseService : CourseService;
  courses: CourseInterface[];
  wishlist: CourseInterface[];


  cartItems:CourseInterface[];


  constructor(service: CourseService, private store: Store<{ cartList: { cart:CourseInterface[] } , wishlistItems: {wishlist: CourseInterface[]}}>) {
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


  RemoveFromCart(element:CourseInterface) {
    if (this.cartItems.some(course=> course.id === element.id)) {
      this.store.dispatch(new AddToCart(element));
    }
    else {
    }
  }

  getDiscountedPrice(e) {
    return this.courseService.getDiscountedPrice(e);
  }
  AddToWishlist(element:CourseInterface) {
    if (!this.wishlist.some(course=> course.id === element.id)) {
      console.log(element);
      this.store.dispatch(new AddToWishlist(element));
    }
    else {
    }
  }

  RemoveFromWishlist(element:CourseInterface) {
    if (this.wishlist.some(course=> course.id === element.id)) {
      this.store.dispatch(new RemoveFromWishlist(element));
    }
    else {
    }
  }


  MoveToWishlist(e:CourseInterface) {
    this.RemoveFromCart(e);
    this.AddToWishlist(e);
  }
  getTotalCartValue () {
    var s = 0
    this.cartItems.forEach(course=>{
      s = s + this.getDiscountedPrice(course);
    })
    return s;
  }

  calculateStyle(e) {
    return this.courseService.calculateStyle(e);
  }

  getOriginialPrice(course) {
    return this.courseService.getOriginialPrice(course);
  }

  CurrentCourseUpdate(course_id) {
    return this.courseService.CurrentCourseUpdate(course_id);
  }

  Checkout() {
    this.courseService.Checkout();
    this.courseService.openDialog();
  }

}
