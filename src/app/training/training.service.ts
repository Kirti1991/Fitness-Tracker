import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { firestore } from "firebase";
import { Subject, Subscription } from "rxjs";
import { map, take } from "rxjs/operators";
import { UIService } from "../shared/ui.service";
import { Exercise } from "./exercise.model";
import * as fromTrainig from "./training.reducer";
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions'
import { Store } from "@ngrx/store";

@Injectable()
export class TrainingService{
    exerciseChanged = new Subject<Exercise>();
  private  availableExercises:Exercise[] =[];
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbsubs:Subscription[] = [];

 private runningExercise:Exercise;
 constructor(private _db:AngularFirestore,private _uiService:UIService,private _store:Store<fromTrainig.State>)
 {}
    getAvaialableExercises()
    {
        //this._uiService.loadingStateChanged.next(true);
        this._store.dispatch(new UI.StartLoading());
      //  return [...this.availableExercises];
      this.fbsubs.push(this._db.collection('availableExercises').snapshotChanges().pipe(map(docArray =>{
        return docArray.map(doc =>{
          //  return {
          //    id: doc.payload.doc.id,
          //    //...doc.payload.doc.data() as {}
          //    name:<string>doc.payload.doc.data().name,
          //    duration: <number>doc.payload.doc.data().duration,
          //    calories: <number>doc.payload.doc.data().calories
          //  }
          const exercise = doc.payload.doc.data() as Exercise;
          exercise.id = doc.payload.doc.id;
          return exercise;
         })
       })).subscribe((res:Exercise[]) =>{
       // this._uiService.loadingStateChanged.next(false);
       this._store.dispatch(new UI.StopLoading());
       //below commented code is previously working code using subjects 
            // this.availableExercises = res;
            // this.exercisesChanged.next([...this.availableExercises]);
      // now we are using ngrx to store
        this._store.dispatch(new Training.SetAvailableTrainings(res));
       },
       error=>{
       // this._uiService.loadingStateChanged.next(false);
       this._store.dispatch(new UI.StopLoading());
           this._uiService.showSnackBar("Fetching exercises failed, please try again later",null,3000);
       }));
    }

    startExercise(selectedId:string)
    {
        
       this._store.dispatch(new Training.StartTraining(selectedId));
    }

    getRunningExercise()
    {
        return {...this.runningExercise}; 
    }
    completeExercise()
    {
      this._store.select(fromTrainig.getActiveExercises).pipe(take(1)).subscribe(exercise =>{
       //this.exercises.push({...this.runningExercise,date:new Date(),state:'completed'});
    this.addDatatoDatabase({...exercise,date:new Date(),state:'completed'});
    this._store.dispatch(new Training.StopTraining());
      });
    
    }

    cancelExcercise(progress:number)
    {
        // this.exercises.push({...this.runningExercise,
        //     duration: this.runningExercise.duration *(progress /100),
        //     calories:this.runningExercise.calories *(progress /100),
        //     date:new Date(),
        //     state:'cancelled'});
        this._store.select(fromTrainig.getActiveExercises).pipe(take(1)).subscribe(exercise =>{
        this.addDatatoDatabase({...exercise,
            duration: exercise.duration *(progress /100),
            calories:exercise.calories *(progress /100),
            date:new Date(),
            state:'cancelled'});
      this._store.dispatch(new Training.StopTraining());
        });
    }

    fetchCompletedorCancelledExercises()
    {
        //return [...this.exercises];
        this.fbsubs.push(this._db.collection('finishedExercises').valueChanges().subscribe((exercises:Exercise[])=>{
            //this.finishedExercisesChanged.next(exercises);
            this._store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));
    }
  private addDatatoDatabase(exercise:Exercise)
  {
    this._db.collection('finishedExercises').add(exercise);
  }

  cancelSubscription()
  {
      this.fbsubs.forEach(sub => sub.unsubscribe());
  }
}