import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
@Output('sidenavlistToggle') sidenavlistToggle = new EventEmitter<void>();
isAuth$:Observable<boolean>;
  authSubscription:Subscription;
  constructor(private _authService:AuthService,private _store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription =  this._authService.authChange.subscribe(res =>{
    //   this.isAuth = res;
    // });
    this.isAuth$ =   this._store.select(fromRoot.getIsAunthenticated);
  }
    
  onclose()
  {
   this.sidenavlistToggle.emit();
  }

  onLogOut(){
    this._authService.logout();
  }

  
}
