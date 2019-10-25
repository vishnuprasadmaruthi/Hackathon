import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  email = localStorage.getItem('email');
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

  ngOnInit(){}
}
