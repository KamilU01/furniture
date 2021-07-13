import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardGuard } from "src/app/services/dashboard.guard";
import { AccountComponent } from "./account.component";
import { DataComponent } from "./data/data.component";
import { HistoryComponent } from "./history/history.component";

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        canActivate: [DashboardGuard],
        children: [
            {
                path: 'dane',
                component: DataComponent
            },
            {
                path: 'historia-zamowien',
                component: HistoryComponent
            },
            {
                path: '',
                redirectTo: 'dane',
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }