import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModuleModule } from "../material-module/material-module.module";

@NgModule({
 imports:[CommonModule,FormsModule, ReactiveFormsModule,MaterialModuleModule],
 exports:[CommonModule,FormsModule, ReactiveFormsModule,MaterialModuleModule]
})
export class SharedModule{

}