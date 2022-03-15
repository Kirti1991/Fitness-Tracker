import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // isloading= false;
  constructor(private _authService:AuthService,private _UIService:UIService,
    private _store:Store<{ui: fromRoot.State}>) { }
  LoginForm:FormGroup;

  ngOnInit(): void {
    // this._UIService.loadingStateChanged.subscribe(isloading =>{
    //  this.isloading = isloading;
    // });
    this.createnewLoginform();
  }

  createnewLoginform()
  {
    this.LoginForm = new FormGroup({
       email: new FormControl('',[Validators.required,Validators.email]),
       password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  onSubmit()
  {
    this._authService.login({
   email: this.LoginForm.value.email,
   password:this.LoginForm.value.password
    });
    console.log(this.LoginForm);
  }

}
