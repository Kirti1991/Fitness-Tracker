import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { MaterialModuleModule } from "../material-module/material-module.module";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";
import { trainingReducer } from "./training.reducer";

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent],
    imports:[SharedModule,TrainingRoutingModule,StoreModule.forFeature('training',trainingReducer)],
    exports:[]
})
export class TrainingModule{

}