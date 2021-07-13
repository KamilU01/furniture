import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/services/auth.guard";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }