import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CourseInterface } from './course_interface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { empty, Subject } from 'rxjs';
import { UserDetailsInterface } from './Interfaces/user_details_interface';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses:any = [];

  cart = [];

  wishlist = [];

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
  AreaofInterestOptions :Object;
  ExperienceOptions :Object;
  ExpertiseOptions:Object;

  constructor(private httpClient: HttpClient, dialogRef : MatDialog) {

    this.dialogRef = dialogRef;

    this.httpClient.get("assets/DataModules/CourseDetails.json").subscribe(data =>{
      // console.log(data);
      this.courses = data;

      this.courses = this.courses.courses;
      this.rootCourses = this.courses.slice();
      this.courses.forEach(element => {
        if (element.cart) {
            this.cart.push(element);
          }
        });

      this.courses.forEach(element => {
        if (element.wishlist) {
            this.wishlist.push(element);
          }
      });
      this.courses.forEach(element => {
        element.discounted_price = element.price - (element.price *element.discount/100);
        }
      );
    });

    this.httpClient.get("assets/DataModules/UserDetails.json").subscribe(data => {
      // console.log(data)
      this.UserDetails = data;
      // console.log(this.UserDetails);

      this.extractedJsonUserData.next(this.UserDetails);

    });

    this.httpClient.get("assets/DataModules/AreaofInterest.json").subscribe(data => {
      // console.log(typeof data);
      this.AreaofInterestOptions = data;
      // console.log(this.AreaofInterestOptions[0]);
      this.extractedJsonAoIData.next(this.AreaofInterestOptions);
    });

    this.httpClient.get("assets/DataModules/Experience.json").subscribe(data => {
      // console.log(data);
      this.ExperienceOptions = data;
      this.extractedJsonExperienceData.next(this.ExperienceOptions);
    });

    this.httpClient.get("assets/DataModules/Expertise.json").subscribe(data => {
      // console.log(data);
      this.ExpertiseOptions = data;
      this.extractedJsonExpertiseData.next(this.ExpertiseOptions);
    });


  }


  getData() {
    // console.log(this.courses);
    return this.courses;
  }

  AddToCart(e) {
    this.courses.forEach(element => {
      if (element.id === e) {
        if (!element.cart) {
          this.justClicked = "AddCart";
          element.cart = true;
          this.cart.push(element);
          // console.log(this.cart);
        }
        else {
          this.justClicked = "OldCart"
        }
      }
    });
  }

  RemoveFromCart(e) {
    this.courses.forEach(element => {
      if (element.id === e) {
        if (element.cart) {
          element.cart = false;
          this.justClicked = "RemoveCart";
          const index = this.cart.indexOf(element);
          if (index > -1) {
            this.cart.splice(index, 1);
          }
        }
      }
    });
  }


  getCartData() {
    return this.cart;
  }


  AddToWishlist(e) {
    this.courses.forEach(element => {
      if (element.id === e) {
        if (!element.wishlist) {
          this.justClicked = "AddWishlist";
          element.wishlist = true;
          this.wishlist.push(element);
        }
        else {
          this.justClicked = "OldWishlist";
        }
      }
    });

    // console.log(this.wishlist);
  }

  RemoveFromWishlist (e) {

    this.courses.forEach(element => {
      if (element.id === e) {
        if (element.wishlist) {
          this.justClicked = "RemoveWishlist";
          element.wishlist = false;
          const index = this.wishlist.indexOf(element);
          if (index > -1) {
            this.wishlist.splice(index, 1);
          }
        }
      }
    });
    // console.log(this.wishlist);
  }

  getWishlistData() {
    return this.wishlist;
  }

  ngOnInit() {

  }

  calculateStyle(e) {
    if (!(e.discount === 0)) {
      // console.log(e + "inside ng style");
      return {"text-decoration": "line-through"};

    }
    // console.log(e);
    return {};
  }

  getOriginialPrice(course) {
    if (course.discount===0) {
      return "-";
    }
    return "Rs. " + course.price;
  }


  getTotalCartValue () {
    // console.log(this.courses , "inside get Total Cart Value");
    var s = 0;
    this.courses.forEach(element => {
        if (element.cart) {
          s = s+ element.discounted_price;
        }
    });
    return s;
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
    // this.justClicked = s;
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

    // console.log(search_courses);
    this.courses = search_courses;
  }

  Sort() {
    this.courses.sort(function(a,b){return a.discounted_price - b.discounted_price});
  }

  // returnUserDetails() {
  //   return this.UserDetails;
  // }
}


