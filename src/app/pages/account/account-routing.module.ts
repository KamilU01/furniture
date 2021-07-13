import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardGuard } from "src/app/services/dashboard.guard";
import { AccountComponent } from "./account.component";

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        canActivate: [DashboardGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }