import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromRoot from "../app.reducer";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate,CanLoad{
    constructor(private _router:Router,
        private _store:Store<fromRoot.State>){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._store.select(fromRoot.getIsAunthenticated).pipe(take(1))
    }
   canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // if(this._authService.isAuth()){
    //     return true;
    // }
    // else
    // {
    //   this._router.navigate(['/login']);
    // }
    return this._store.select(fromRoot.getIsAunthenticated).pipe(take(1));
   }
}