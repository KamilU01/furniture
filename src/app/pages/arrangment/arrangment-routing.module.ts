import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArrangmentComponent } from "./arrangment.component";

const routes: Routes = [
    {
        path: ':id',
        component: ArrangmentComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArrangmentRoutingModule { }