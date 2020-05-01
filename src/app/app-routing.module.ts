import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { SeatsComponent } from './posts/seats/seats.component';
import { TicketComponent } from './posts/ticket/ticket.component';


const routes: Routes = [
  {path: '', component:PostListComponent},
  {path: 'create',component: PostCreateComponent, canActivate: [AuthGuard]},
  {path:'edit/:postId',component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'signup',component: SignupComponent},
  {path:'seats',component: SeatsComponent,canActivate: [AuthGuard]},
  {path:'ticket',component: TicketComponent,canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

}) 
export class AppRoutingModule { }
