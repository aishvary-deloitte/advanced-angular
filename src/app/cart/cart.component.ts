import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  courseService : CourseService;

  constructor(service: CourseService) {
    this.courseService = service;
  }

  AddToCart (e) {
    this.courseService.AddToCart(e);
    this.courseService.openDialog();
  }

  getCartData() {
    return this.courseService.getCartData();
  }
  AddToWishlist(e) {
    this.courseService.AddToWishlist(e);
    this.courseService.openDialog();
  }

  RemoveFromWishlist(e) {
    this.courseService.RemoveFromWishlist(e);
    this.courseService.openDialog();
  }

  getWishlistData() {
    return this.courseService.getWishlistData();
  }

  RemoveFromCart(e) {
    this.courseService.RemoveFromCart(e);
    this.courseService.openDialog();
  }

  ngOnInit(): void {
  }

  MoveToWishlist(e) {
    this.courseService.RemoveFromCart(e);
    this.courseService.AddToWishlist(e);
    this.courseService.openDialog();
  }
  getTotalCartValue () {
    return this.courseService.getTotalCartValue();
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
