import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { ToastrModule } from 'ngx-toastr';


import {AngularFireModule} from '@angular/fire'
//import {AngularFirestoreModule} from '@angular/fire/firestore'
//import {AngularFireStorageModule} from '@angular/fire/storage'
//import {AngularFireAuthModule} from '@angular/fire/auth'

//import {environment} from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RecordComponent } from './admin-panel/record/record.component';
import { RecordListComponent } from './admin-panel/record-list/record-list.component';
import { RecordsComponent } from './records/records.component';
import { SafePipe } from './pipe/pipe.component';
import { RecordDetailsComponent } from './records/record-details/record-details.component';
import { RecordService } from './shared/record.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from './shared/category.service';
import { CategoryPanelComponent } from './admin-panel/category-panel/category-panel.component';
import { ClothingComponent } from './admin-panel/clothing/clothing.component';
import { FlagComponent } from './admin-panel/flag/flag.component';
import { HomeService } from './shared/home.service';
import { FlagsComponent } from './flags/flags.component';
import { ClothingsComponent } from './clothings/clothings.component';
import { ClothingDetailsComponent } from './clothings/clothing-details/clothing-details.component';
import { FlagDetailsComponent } from './flags/flag-details/flag-details.component';
import { RecordsFilterPipe } from './records-filter.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    RecordComponent,
    RecordListComponent,
    RecordsComponent,
    SafePipe,
    RecordDetailsComponent,
    CategoryPanelComponent,
    ClothingComponent,
    FlagComponent,
    FlagsComponent,
    ClothingsComponent,
    ClothingDetailsComponent,
    FlagDetailsComponent,
    RecordsFilterPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    //AngularFireStorageModule,
    //AngularFireAuthModule,
    OrderModule
    
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    RecordComponent,
    CategoryPanelComponent,
    RecordService,
    CategoryService,
    HomeService,
    { provide: MatDialogRef, useValue: {} },
	  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [RecordComponent, CategoryPanelComponent]
})
export class AppModule { }
