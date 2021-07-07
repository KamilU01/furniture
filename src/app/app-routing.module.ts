import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./pages/homepage/homepage.module").then(m => m.HomepageModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 128] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }