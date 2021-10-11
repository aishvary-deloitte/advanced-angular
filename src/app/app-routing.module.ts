import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes : Routes = [
  {path: '', component: DashboardComponent},

  {path: 'cart', component: CartComponent , pathMatch: 'full' },

  {path: 'profile', component: ProfileComponent, pathMatch: 'full' },

  {path: 'wishlist', component: WishlistComponent, pathMatch: 'full' },

  {path: 'course-details', component: CourseDetailsComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
