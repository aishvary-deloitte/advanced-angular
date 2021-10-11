import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  p: number = 1;

  searchInput = "";
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
  AddToWishlist(e) {
    this.courseService.AddToWishlist(e);
    this.courseService.openDialog();
  }

  RemoveFromWishlist(e) {
    this.courseService.RemoveFromWishlist(e);
    this.courseService.openDialog();
  }

  calculateStyle(e) {
    return this.courseService.calculateStyle(e);
  }

  getOriginialPrice(course) {
    return this.courseService.getOriginialPrice(course);
  }

  getTotalCartValue () {
    return this.courseService.getTotalCartValue();
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
