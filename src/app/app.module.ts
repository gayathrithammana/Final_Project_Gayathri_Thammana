import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TransportListComponent } from './transport-list/transport-list.component';
import { TransportSitesComponent } from './transport-list/transport-sites/transport-sites.component';
import { PreloaderPageComponent } from './preloader-page/preloader-page.component';
import { FooterComponent } from './footer/footer.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AdventureListComponent } from './adventure-list/adventure-list.component';
import { BooknowComponent } from './booknow/booknow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { PackageEvenComponent } from './package-even/package-even.component';
import { ShoppingCartPackageComponent } from './shopping-cart-package/shopping-cart-package.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';
// import { PackagePageModule } from './package-page/package-page.module';
import { BlogComponent } from './blog/blog.component';

import { SortList } from './common/util/sortList.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SignupPageComponent,
    LoginPageComponent,
    TransportListComponent,
    TransportSitesComponent,
    PreloaderPageComponent,
    FooterComponent,
    AccomodationComponent,
    AdventureListComponent,
    BooknowComponent,
    PackageEvenComponent,
    ShoppingCartPackageComponent,
    ShoppingCartPageComponent,
    BlogComponent,
    SortList,
    ContactUsComponent,
    FaqComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // PackagePageModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
