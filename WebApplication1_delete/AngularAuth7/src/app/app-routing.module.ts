import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RecordDetailsComponent } from './records/record-details/record-details.component';
import { ClothesComponent } from './records/clothes/clothes.component';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './records/record/record.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path:"user",component:UserComponent,
    children:[
      { path:'registration',component:RegistrationComponent},
      { path:'login',component:LoginComponent}
    ]
  },
  {path:"home", component:HomeComponent,canActivate:[AuthGuard]},
  {path:"forbidden", component:ForbiddenComponent},
  {path:"record/:id", component:RecordDetailsComponent},
  {path:"clothes", component:ClothesComponent},
  {path:"record", component:RecordComponent},
  { 
    path:"adminpanel", component:AdminPanelComponent,canActivate:[AuthGuard],data : {permittedRoles:['Admin']},
    children: [
      { path: "clothes", component: ClothesComponent},
      { path: "record", component: RecordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
