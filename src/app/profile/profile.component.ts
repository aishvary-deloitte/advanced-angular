import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
// import { HttpClient } from "@angular/common/http";
import { Validators ,FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UserDetailsInterface } from '../Interfaces/user_details_interface';
import { AreaofInterestInterface } from '../Interfaces/area_of_interest_interface';
import { ExperienceInterface } from '../Interfaces/experience_interface';
import { ExpertiseInterface } from '../Interfaces/ExpertiseInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  MyProfileForm : FormGroup;
  // ExtractedUserDetails = new Subject<void>();
  UserDetails : UserDetailsInterface;
  AreaofInterest :Array< AreaofInterestInterface>;
  Experience : Array<ExperienceInterface>;
  Expertise : Array<ExpertiseInterface>;

  ProfileService : CourseService;
  us = [];

  selectedRadio = "Student";


  constructor(service : CourseService) {
    this.ProfileService = service;
    // this.UserDetails = this.ProfileService.returnUserDetails();
    // this.UserDetails.displayName = 'Saurabh';
    // this.UserDetails.firstName = 'Saurabh';
    // this.UserDetails.lastName = 'Sinha';
    // this.UserDetails.aboutYourself = 'I am Iron Man';
    // this.UserDetails.

  }

  ngOnInit(): void {
    this.ProfileService.extractedJsonUserData.subscribe(
      (data:any) => {

      this.UserDetails = data;
      }

    );


    this.ProfileService.extractedJsonAoIData.subscribe (
      (data:any) => {
        this.AreaofInterest =data;
        // console.log(this.AreaofInterest);
      }
    )

    this.ProfileService.extractedJsonExperienceData.subscribe (
      (data:any) => {
        this.Experience =data;
        // console.log(this.Experience);
      }
    )

    this.ProfileService.extractedJsonExpertiseData.subscribe (
      (data:any) => {
        this.Expertise =data;
        // console.log(this.Expertise);
      }
    )



    this.MyProfileForm = new FormGroup({
      'displayName' : new FormControl(this.UserDetails.displayName, Validators.required),

      'firstName' : new FormControl(this.UserDetails.firstName, Validators.required),

      'lastName' : new FormControl(this.UserDetails.lastName, Validators.required),

      'aboutYourself' : new FormControl(this.UserDetails.aboutYourself, Validators.required),

      'AreaofInterests': new FormGroup(
        {
          'designer' : new FormControl(true),
          'developer' : new FormControl(false),
          'manager' : new FormControl(false),
          'sales' : new FormControl(false)
        }
      ),

      'profession' : new FormControl('Student'),
      'experience' : new FormControl(this.UserDetails.experience),
      'Expertise' : new FormControl(this.UserDetails.expertise),
      'Role': new FormControl(this.UserDetails.roleText)

    });

  }

  getData() {


  }

  SorP(evt) {
    if (evt.target.value==="Student") {
      this.selectedRadio="Student";
    }
    else {
      this.selectedRadio = "Professional";
    }
  }


  // selectedExperience () {
  //   this.Experience.forEach(element => {
  //       if (element.id === this.UserDetails.experience
  //   });
  // }
  // returnAoIForm() {
  //   var obj = {};
  //   this.AreaofInterest.forEach(element => {
  //     var x =element.id;
  //     obj.x
  //   });
  // }

  onSubmit() {
    this.UserDetails.displayName = this.MyProfileForm.value.displayName;
    this.UserDetails.firstName = this.MyProfileForm.value.firstName;
    this.UserDetails.lastName = this.MyProfileForm.value.lastName;
    this.UserDetails.aboutYourself = this.MyProfileForm.value.aboutYourself;
    console.log(this.MyProfileForm);
    this.UserDetails.isProfessional = (this.MyProfileForm.value.profession==="Professional")
    this.UserDetails.expertise = this.MyProfileForm.value.Expertise;
    this.UserDetails.experience = this.MyProfileForm.value.experience;
  }


}
