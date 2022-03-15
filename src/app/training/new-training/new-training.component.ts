import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTrainig from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  constructor(private _trainingService:TrainingService,private _store:Store<fromTrainig.State>
    ) { }
  ExercisesList$:Observable<Exercise[]>;
  exerciseDrp:FormControl= new FormControl();

  ngOnInit(): void {
    this._trainingService.getAvaialableExercises();
    // this._trainingService.exercisesChanged.subscribe(exercises =>
    //   {
    //     this.ExercisesList = exercises;
    //   });
    this.ExercisesList$ = this._store.select(fromTrainig.getAvailableExercises);
  }

  onStartTraining(form:NgForm)
  {
    let id =form.value.Exercises;
    this._trainingService.startExercise(id);
  }

}
