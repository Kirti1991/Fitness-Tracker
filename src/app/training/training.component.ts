import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';
import * as fromTrainig from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
 ongoingTraining$:Observable<boolean>;
 

  constructor(private _trainingService:TrainingService,private _store:Store<fromTrainig.State>) { }

  ngOnInit(): void {
    // this.exerciseSubscription = this._trainingService.exerciseChanged.subscribe(res=>{
    // if(res)
    // this.ongoingTraining = true;
    // else
    // this.ongoingTraining = false;
    // });
  this.ongoingTraining$ = this._store.select(fromTrainig.getIsTraining);
  }


}
