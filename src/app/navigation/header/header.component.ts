import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from "../../app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output('sidenavtoggle') sidenavtoggle = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription:Subscription;

  constructor(private _store:Store<fromRoot.State>,private _authService:AuthService) { }

  ngOnInit(): void {
    this.isAuth$ =   this._store.select(fromRoot.getIsAunthenticated);
  }
   
  onToggle()
  {
   this.sidenavtoggle.emit();
  }

  onLogOut(){
    this._authService.logout();
  }
  
  
  
}
