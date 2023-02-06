import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: BlogsComponent},
  {path: "profile", component: ProfileComponent , canActivate: [AuthGuard] },
  {path: "register", component: RegisterComponent},
  {path: "login" , component: LoginComponent},
  {path: "admin" , component: AdminComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
