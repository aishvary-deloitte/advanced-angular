import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseService } from 'src/app/course.service';
import { CourseInterface } from 'src/app/course_interface';
import { cartListReducer } from '../cart/store/cart.reducer';
import { wishlistReducer } from '../wishlist/store/wishlist.reducer';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule, MatDialogModule, StoreModule.forRoot({cartList:cartListReducer, wishlistItems: wishlistReducer}), NgxPaginationModule],
      providers: [CourseService]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
