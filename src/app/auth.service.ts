import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users :any[] = [
    {
      id:1,
      name:'Swapnil',
      username:'IRIS01',
      password:''
    },
    {
      id:1,
      name:'Umesh',
      username:'umesh',
      password:'xyz'
    }
  ]
  session:any;
  constructor(private router : Router) { 
    let session:any = localStorage.getItem('session');
    if(session){
      session = JSON.parse(session);
    }

    this.session = session;
  }

  login(username:string,password:string){
    let user = this.users.find((u) => u.username === username && u.password === password);

    if(user) {
      this.session= user;
      localStorage.setItem('session',JSON.stringify(this.session));
      localStorage.setItem('username',username);

    }
     


    return user;

  }

  logout(){
    this.router.navigateByUrl('/');
    window.location.reload();
    this.session = undefined;
    localStorage.removeItem('session');

  }
}
