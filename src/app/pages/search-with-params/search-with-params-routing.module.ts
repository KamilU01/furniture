import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchWithParamsComponent } from "./search-with-params.component";

const routes: Routes = [
    {
        path: '',
        component: SearchWithParamsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchWithParamsRoutingModule { }