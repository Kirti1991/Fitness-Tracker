import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTrainig from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration','state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private _trainingService:TrainingService,private _store:Store<fromTrainig.State>) { }

  ngOnInit(): void {
     this._trainingService.fetchCompletedorCancelledExercises();
    //  this._trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[])=>{
    //    this.dataSource.data = exercises;
    //  });
    this._store.select(fromTrainig.getFinishedExercises).subscribe(exercises =>{
      this.dataSource.data = exercises;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

