import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./pages/homepage/homepage.module").then(m => m.HomepageModule)
    },
    {
        path: 'autoryzacja',
        loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: 'konto',
        loadChildren: () => import("./pages/account/account.module").then(m => m.AccountModule)
    },
    {
        path: 'faq',
        loadChildren: () => import("./pages/faq/faq.module").then(m => m.FaqModule)
    },
    {
        path: 'polityka-prywatnosci',
        loadChildren: () => import("./pages/privacy-policy/privacy-policy.module").then(m => m.PrivacyPolicyModule)
    },
    {
        path: 'regulamin',
        loadChildren: () => import("./pages/regulations/regulations.module").then(m => m.RegulationsModule)
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 128] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }