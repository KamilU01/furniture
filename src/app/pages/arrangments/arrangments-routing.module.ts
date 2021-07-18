import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArrangmentsComponent } from "./arrangments.component";

const routes: Routes = [
    {
        path: '',
        component: ArrangmentsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArrangmentsRoutingModule { }