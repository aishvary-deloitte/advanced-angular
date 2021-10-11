import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { CourseInterface } from '../course_interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  courseService : CourseService;

  // currentCourse :CourseInterface;

  constructor(service: CourseService) {
    this.courseService = service;
  }

  ngOnInit(): void {
  }

  getCurrentCourse() {
    return this.courseService.getCurrentCourse();
  }

  AddToWishlist(e) {
    this.courseService.AddToWishlist(e);
    this.courseService.openDialog();
  }

  AddToCart (e) {
    this.courseService.AddToCart(e);
    this.courseService.openDialog();
  }


}
