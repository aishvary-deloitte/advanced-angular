import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  courseService : CourseService;

  constructor(service: CourseService) {
    this.courseService = service;
  }

  ngOnInit(): void {
  }

  NewCart() {
    return "AddCart" === this.courseService.justClicked;
  }

  OldCart() {
    return "OldCart" === this.courseService.justClicked;
  }

  DeleteCart() {
    return "RemoveCart" === this.courseService.justClicked;
  }

  NewWishlist() {
    return "AddWishlist" === this.courseService.justClicked;
  }

  OldWishlist() {
    return "OldWishlist" === this.courseService.justClicked;
  }

  DeleteWishlist() {
    return "RemoveWishlist" === this.courseService.justClicked;
  }

  Checkout() {
    return "Checkout" === this.courseService.justClicked;
  }
}
