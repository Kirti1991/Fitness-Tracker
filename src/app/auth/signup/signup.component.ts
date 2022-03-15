import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate:Date;
  constructor(private _authService:AuthService) { }

  SignUpForm:FormGroup;

  ngOnInit(): void {
    this.createnewform();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  createnewform()
  {
    this.SignUpForm = new FormGroup({
       email: new FormControl('',[Validators.required,Validators.email]),
       password: new FormControl('',[Validators.required,Validators.minLength(6)]),
       birthDate: new FormControl('',[Validators.required]),
       agree: new FormControl(null,[Validators.required])
    })
  }

  onSubmit()
  {
    this._authService.registerUser({
   email: this.SignUpForm.controls.email.value,
   password:this.SignUpForm.controls.password.value
    });
    console.log(this.SignUpForm);
  }

}
