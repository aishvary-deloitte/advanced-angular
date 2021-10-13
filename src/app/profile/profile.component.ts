import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
// import { HttpClient } from "@angular/common/http";
import { Validators ,FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UserDetailsInterface } from '../interfaces/user_details_interface';
import { AreaofInterestInterface } from '../interfaces/area_of_interest_interface';
import { ExperienceInterface } from '../interfaces/experience_interface';
import { ExpertiseInterface } from '../interfaces/ExpertiseInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  MyProfileForm : FormGroup;
  // ExtractedUserDetails = new Subject<void>();
  UserDetails : UserDetailsInterface;
  AreaofInterest :AreaofInterestInterface[];
  Experience : ExperienceInterface[];
  Expertise : ExpertiseInterface[];

  ProfileService : CourseService;
  us = [];

  selectedRadio = "Student";


  constructor(service : CourseService) {
    this.ProfileService = service;

  }

  ngOnInit(): void {
    this.ProfileService.extractedJsonUserData.subscribe(
      (data:UserDetailsInterface) => {

      this.UserDetails = data;
      }
    );


    this.ProfileService.extractedJsonAoIData.subscribe (
      (data:AreaofInterestInterface[]) => {
        this.AreaofInterest =data;
      }
    )

    this.ProfileService.extractedJsonExperienceData.subscribe (
      (data:ExperienceInterface[]) => {
        this.Experience =data;

      }
    )

    this.ProfileService.extractedJsonExpertiseData.subscribe (
      (data:ExpertiseInterface[]) => {
        this.Expertise = data;
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
