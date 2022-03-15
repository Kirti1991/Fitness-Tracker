import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from "angularfire2/auth";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-dtaa.model";
import * as fromRoot from "../app.reducer";
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService{
    
    constructor(private _router:Router,private _auth:AngularFireAuth,private _trainingService:TrainingService,
        private _snackBar: MatSnackBar,
        private _uiService:UIService,
        private _store:Store<fromRoot.State>){

    }

    initAuthListner(){
        this._auth.authState.subscribe(
            user =>{
                if(user)
                {
                    this._store.dispatch(new Auth.SetAuthenticated());
                    this._router.navigate(['/training']);
                }
                else
                {
                    this._trainingService.cancelSubscription();
                    this._store.dispatch(new Auth.SetUnauthenticated());
                    this._router.navigate(['/login']);
                }
            }
        )
    }

    registerUser(authData:AuthData)
    {
        //this._uiService.loadingStateChanged.next(true);
        this._store.dispatch(new UI.StartLoading());
        this._auth.auth.createUserWithEmailAndPassword(authData.email,authData.password).then(
            result =>{
              //  this._uiService.loadingStateChanged.next(false);
              this._store.dispatch(new UI.StopLoading());
            }
        )
        .catch(error =>{
            // this._uiService.loadingStateChanged.next(false);
            this._store.dispatch(new UI.StopLoading());
           this._uiService.showSnackBar(error.message,null,3000);
        });
    }

   

    login(authData:AuthData)
    {
      //  this._uiService.loadingStateChanged.next(true);
      this._store.dispatch(new UI.StartLoading());
     this._auth.auth.signInWithEmailAndPassword(authData.email,authData.password).then(
        result =>{
            //this._uiService.loadingStateChanged.next(false);
            this._store.dispatch(new UI.StopLoading());
        }
    )
    .catch(error =>{
       // this._uiService.loadingStateChanged.next(false);
       this._store.dispatch(new UI.StopLoading());
        this._uiService.showSnackBar(error.message,null,3000);
    });
    }

    logout(){
        this._auth.auth.signOut();
    }

}