import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RodoComponent } from "./rodo.component";

const routes: Routes = [
    {
        path: '',
        component: RodoComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RodoRoutingModule { }