import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule {}
