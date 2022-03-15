import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import * as fromTrainig from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

   progress = 0;
   timer:number;
  constructor(public dialog: MatDialog,private _trainingService:TrainingService,private _store:Store<fromTrainig.State>) { }

  ngOnInit(): void {
    this.StartorResumeTimer();
  }

  StartorResumeTimer()
  {
    this._store.select(fromTrainig.getActiveExercises).pipe(take(1)).subscribe((exercise)=>{
      //const step = this._trainingService.getRunningExercise().duration / 100 * 1000;
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(()=>{
        this.progress = this.progress + 1;
        if(this.progress == 100)
        {
          this._trainingService.completeExercise();
          clearInterval(this.timer);
        }
         },step);
    });
  }

  onStop()
  {
     clearInterval(this.timer); 
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {progress:this.progress},
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result)
     this._trainingService.cancelExcercise(this.progress);
     else
     this.StartorResumeTimer();
    });
  }

  

}
