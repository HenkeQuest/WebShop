import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RecordDetailsComponent } from './home/records/record-details/record-details.component';
import { ClothingComponent } from './admin-panel/clothing/clothing.component';
import { RecordsComponent } from './home/records/records.component';
import { RecordComponent } from './admin-panel/record/record.component';
import { FlagComponent } from './admin-panel/flag/flag.component';
import { FlagsComponent } from './home/flags/flags.component';
import { ClothingsComponent } from './home/clothings/clothings.component';
import { ClothingDetailsComponent } from './home/clothings/clothing-details/clothing-details.component';
import { FlagDetailsComponent } from './home/flags/flag-details/flag-details.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path:"user",component:UserComponent,
    children:[
      { path:'registration',component:RegistrationComponent},
      { path:'login',component:LoginComponent}
    ]
  },
  {path:"home", component:HomeComponent,canActivate:[AuthGuard],
    children: [
      { path: "record/:id", component: RecordDetailsComponent},
      { path: "records", component: RecordsComponent},
      { path: "flags", component: FlagsComponent},
      { path: "flag/:id", component: FlagDetailsComponent},
      { path: "clothings", component: ClothingsComponent},
      { path: "clothing/:id", component: ClothingDetailsComponent}
    ]
  },
  {path:"forbidden", component:ForbiddenComponent},
  {path:"adminpanel/clothing", component:ClothingComponent},
  {path:"adminpanel/record", component:RecordComponent},
  {path:"adminpanel/flag", component: FlagComponent},
  {path:"adminpanel", component:AdminPanelComponent,canActivate:[AuthGuard],data : {permittedRoles:['Admin']}}
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
