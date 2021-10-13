import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CourseInterface } from './course_interface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { Observable, Subject , } from 'rxjs';
import {map} from 'rxjs/operators'
import { UserDetailsInterface } from './interfaces/user_details_interface';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AreaofInterestInterface } from './interfaces/area_of_interest_interface';
import { ExperienceInterface } from './interfaces/experience_interface';
import { ExpertiseInterface } from './interfaces/ExpertiseInterface';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses:CourseInterface[]|any;
  cart$: Observable<{ cart: CourseInterface[]}>
  cart = [];
  current_course:CourseInterface;
  dialogRef : MatDialog;

  justClicked = "";

  rootCourses = [];

  // data1;
  extractedJsonUserData = new BehaviorSubject<any>({});
  extractedJsonAoIData = new BehaviorSubject<any>({});
  extractedJsonExperienceData = new BehaviorSubject<any>({});
  extractedJsonExpertiseData = new BehaviorSubject<any>({});

  UserDetails :any;
  AreaofInterestOptions :AreaofInterestInterface[] = [];
  ExperienceOptions :ExperienceInterface[] = [];
  ExpertiseOptions:ExpertiseInterface[] = [];

  constructor(private httpClient: HttpClient, dialogRef : MatDialog, private store:Store <{ cartList: { cart:CourseInterface[] } }>) {

    this.dialogRef = dialogRef;
    this.current_course = {} as CourseInterface;

    this.httpClient.get("assets/DataModules/CourseDetails.json").subscribe(data =>{
      // console.log(data);
      this.courses = data;
      this.courses = this.courses.courses;
      // console.log(this.courses);
      this.rootCourses = this.courses.slice();

    });

    this.httpClient.get("assets/DataModules/UserDetails.json").subscribe(data => {
      // console.log(data)
      this.UserDetails = data;

      this.extractedJsonUserData.next(this.UserDetails);

    });

    this.httpClient.get("assets/DataModules/AreaofInterest.json").pipe(map(data=> data as AreaofInterestInterface[])).subscribe(data => {
      console.log(typeof data);
      console.log(data)
      data.forEach(element =>
        this.AreaofInterestOptions.push(element));

      this.extractedJsonAoIData.next(this.AreaofInterestOptions);
    });

    this.httpClient.get("assets/DataModules/Experience.json").pipe(map(data=> data as ExperienceInterface[])).subscribe(data => {
      // console.log(typeof data);
      // console.log(typeof Object.values(data));
      this.ExperienceOptions = data;
      this.extractedJsonExperienceData.next(this.ExperienceOptions);
    });

    this.httpClient.get("assets/DataModules/Expertise.json").pipe(map(data=> data as ExpertiseInterface[])).subscribe(data => {
      this.ExpertiseOptions = data;
      this.extractedJsonExpertiseData.next(this.ExpertiseOptions);
    });


  }

  getAllCourses() {
    return  this.httpClient.get("assets/DataModules/CourseDetails.json");
  }

  getDiscountedPrice(element) {
    return element.price - (element.price *element.discount/100);
  }

  ngOnInit() {

  }

  calculateStyle(e) {
    if (!(e.discount === 0)) {
      return {"text-decoration": "line-through"};

    }
    return {};
  }

  getOriginialPrice(course) {
    if (course.discount===0) {
      return "-";
    }
    return "Rs. " + course.price;
  }

  CurrentCourseUpdate(course_id) {
    this.courses.forEach(element => {
      if (element.id ===course_id) {
        this.current_course = element;
      }
      });
  }

  getCurrentCourse() {
    return this.current_course;
  }

  openDialog() {
    this.dialogRef.open(PopUpComponent);
  }

  Checkout() {
    this.justClicked = "Checkout";
  }

  search (value) {
    var search_courses = [];
    this.rootCourses.forEach(course => {
      if ((course.title.search(value) !== -1) || (course.course_creator.search(value)!==-1)) {
        search_courses.push(course);
      }
    });

    this.courses = search_courses;
  }

  Sort() {
    this.courses.sort(function(a,b){return a.discounted_price - b.discounted_price});
  }

}


