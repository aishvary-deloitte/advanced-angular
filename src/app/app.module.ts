import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core.module';
import { ProfileModule } from './profile/profile.module';
import { CourseModule } from './course/course.module';


import { MatDialogModule } from '@angular/material/dialog';
import { cartListReducer } from './course/cart/store/cart.reducer';
import { wishlistReducer } from './course/wishlist/store/wishlist.reducer';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopUpComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({cartList:cartListReducer, wishlistItems: wishlistReducer}),
    ProfileModule,
    CourseModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
