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
import { ClothingComponent } from './admin-panel/clothing/clothing.component';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './admin-panel/record/record.component';
import { FlagComponent } from './admin-panel/flag/flag.component';
import { FlagsComponent } from './flags/flags.component';
import { ClothingsComponent } from './clothings/clothings.component';
import { ClothingDetailsComponent } from './clothings/clothing-details/clothing-details.component';
import { FlagDetailsComponent } from './flags/flag-details/flag-details.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path:"user",component:UserComponent,
    children:[
      { path:'registration',component:RegistrationComponent},
      { path:'login',component:LoginComponent}
    ]
  },
  { path: "home", component:HomeComponent,canActivate:[AuthGuard]},
  { path: "profile", component:ProfileComponent,data : {permittedRoles:['Customer']}},
  { path: "record/:id", component: RecordDetailsComponent},
  { path: "record", component:RecordComponent},
  { path: "records", component: RecordsComponent},
  { path: "flags", component: FlagsComponent},
  { path: "flag/:id", component: FlagDetailsComponent},
  { path: "clothings", component: ClothingsComponent},
  { path: "clothing/:id", component: ClothingDetailsComponent},
  { path: "forbidden", component:ForbiddenComponent},
  { path: "clothing", component:ClothingComponent, outlet:"category"},
  { path: "record", component:RecordComponent, outlet:"category"},
  { path: "flag", component: FlagComponent, outlet:"category"},
  { path: "adminpanel", component:AdminPanelComponent,canActivate:[AuthGuard],data : {permittedRoles:['Admin']}}
  // {path:"adminpanel", component:AdminPanelComponent,canActivate:[AuthGuard],data : {permittedRoles:['Admin']},
  //   children: [
  //     { path: "clothing", component: ClothingComponent},
  //     { path: "record", component: RecordComponent},
  //     { path: "flag", component: FlagComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
