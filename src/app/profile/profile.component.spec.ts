import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseService } from 'src/app/course.service';
import { CourseInterface } from 'src/app/course_interface';
import { cartListReducer } from '../course/cart/store/cart.reducer';
import { wishlistReducer } from '../course/wishlist/store/wishlist.reducer';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [HttpClientModule, MatDialogModule, StoreModule.forRoot({cartList:cartListReducer, wishlistItems: wishlistReducer})],
      providers: [CourseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
