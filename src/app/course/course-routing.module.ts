import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  {path: '', component: DashboardComponent , pathMatch: 'full' },
  {path: 'cart', component: CartComponent , pathMatch: 'full' },

  {path: 'wishlist', component: WishlistComponent, pathMatch: 'full' },

  {path: 'course-details', component: CourseDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
