import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseService } from '../../course.service';
import { CourseInterface } from '../../course_interface';
import { AddToCart } from '../cart/store/cart.actions';
import { AddToWishlist } from '../wishlist/store/wishlist.actions';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  courseService : CourseService;
  courses:CourseInterface[];

  cartItems:CourseInterface[];
  wishlist:CourseInterface[];


  // currentCourse :CourseInterface;

  constructor(service: CourseService,  private store: Store<{ cartList: { cart:CourseInterface[] } , wishlistItems: {wishlist: CourseInterface[]}}>) {
    this.courseService = service;
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

  getCurrentCourse() {
    return this.courseService.getCurrentCourse();
  }

  AddToWishlist(element:CourseInterface) {
    if (!this.wishlist.some(course=> course.id === element.id)) {
      console.log(element);
      this.store.dispatch(new AddToWishlist(element));
    }
    else {
    }
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

}
