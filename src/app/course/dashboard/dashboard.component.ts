import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseInterface } from 'src/app/course_interface';
import { CourseService } from '../../course.service';
import { AddToCart } from '../cart/store/cart.actions';
import { AddToWishlist, RemoveFromWishlist } from '../wishlist/store/wishlist.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  p: number = 1;
  courses : CourseInterface[];
  cartItems:CourseInterface[];
  wishlist:CourseInterface[];
  searchInput = "";
  courseService : CourseService;

  constructor(service: CourseService,  private store: Store<{ cartList: { cart:CourseInterface[] } , wishlistItems: {wishlist: CourseInterface[]}}>) {
    this.courseService = service;
    this.courses = [];
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data:any)=>{
      this.courses = data.courses;
    })

    this.store.select('cartList').subscribe((data)=>{
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

  inWishlist(e:CourseInterface) {
    if (this.wishlist.some(course=> course.id === e.id)) {
      return true
    }
    else {
      return false
    }
  }
  calculateStyle(e) {
    return this.courseService.calculateStyle(e);
  }

  getOriginialPrice(course) {
    return this.courseService.getOriginialPrice(course);
  }

  getTotalCartValue () {
    var s = 0
    this.cartItems.forEach(course=>{
      s = s + this.getDiscountedPrice(course);
    })
    return s;
  }

  CurrentCourseUpdate(course_id) {
    return this.courseService.CurrentCourseUpdate(course_id);
  }

  AddSearchInput(e) {
    this.searchInput = e.target.value;
    // console.log(this.searchInput)
  }

  Search() {
    this.courseService.search(this.searchInput);
    this.searchInput = "";
  }

  Sort() {
    this.courseService.Sort();
  }

}
