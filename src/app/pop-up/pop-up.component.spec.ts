import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { CourseService } from '../course.service';
import { cartListReducer } from '../course/cart/store/cart.reducer';
import { wishlistReducer } from '../course/wishlist/store/wishlist.reducer';

import { PopUpComponent } from './pop-up.component';

describe('PopUpComponent', () => {
  let component: PopUpComponent;
  let fixture: ComponentFixture<PopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpComponent ],
      imports: [MatDialogModule, HttpClientModule, StoreModule.forRoot({cartList:cartListReducer, wishlistItems: wishlistReducer})],
      providers: [CourseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
