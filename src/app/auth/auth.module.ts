import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModuleModule } from "../material-module/material-module.module";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations:[SignupComponent,LoginComponent],
    imports:[SharedModule,AuthRoutingModule ],
    exports:[]
})
export class AuthModule{

}