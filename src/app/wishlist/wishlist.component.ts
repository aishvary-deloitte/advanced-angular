import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  courseService : CourseService;

  constructor(service: CourseService) {
    this.courseService = service;
  }

  ngOnInit(): void {
    // this.courseService.assignData();
  }

  getData() {
    return this.courseService.getData();
  }

  AddToCart (e) {
    this.courseService.AddToCart(e);
    this.courseService.openDialog();
  }

  getCartData() {
    return this.courseService.getCartData();
  }

  RemoveFromWishlist(e) {
    this.courseService.RemoveFromWishlist(e);
    this.courseService.openDialog();
  }

  getWishlistData() {
    return this.courseService.getWishlistData();
  }
  getTotalCartValue () {
    return this.courseService.getTotalCartValue();
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
