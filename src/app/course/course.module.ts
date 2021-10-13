import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [
    WishlistComponent,
    CourseDetailsComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    CourseRoutingModule
  ],
})
export class CourseModule {}
