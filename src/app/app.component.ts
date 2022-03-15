import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { UIService } from './shared/ui.service';
import * as fromRoot from "./app.reducer";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  openSideNav:boolean = false;
  isloading$ :Observable<boolean>;
 
  constructor(private _auth:AuthService,private _UIService:UIService,
    private _store:Store<fromRoot.State>)
  {

  }
  ngOnInit(): void {
     this.isloading$ = this._store.select(fromRoot.getIsLoading);
    // this._UIService.loadingStateChanged.subscribe(isloading =>{
    //   this.isloading = isloading;
    //  });
     this._auth.initAuthListner(); 
  }
}
