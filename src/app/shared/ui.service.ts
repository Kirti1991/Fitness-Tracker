import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable()
export class UIService
{
    constructor(private _snackBar: MatSnackBar)
    {

    }
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    loadingStateChanged = new Subject<boolean>();
    showSnackBar(message, action,duration)
    {
        this._snackBar.open(message, action,{
            duration:duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}