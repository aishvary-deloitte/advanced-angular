import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseService } from 'src/app/course.service';
import { CourseInterface } from 'src/app/course_interface';
import { cartListReducer } from '../cart/store/cart.reducer';
import { wishlistReducer } from '../wishlist/store/wishlist.reducer';

import { CourseDetailsComponent } from './course-details.component';


describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDetailsComponent ],

      imports: [HttpClientModule, MatDialogModule, StoreModule.forRoot({cartList:cartListReducer, wishlistItems: wishlistReducer})],
      providers: [CourseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
