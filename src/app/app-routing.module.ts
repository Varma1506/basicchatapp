import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path : 'chat' , component : ChatComponent},
  { path : 'sign-up' , component : SingupComponent},
  { path : 'login' , component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
