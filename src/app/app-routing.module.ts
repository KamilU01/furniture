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
    {
        path: 'o-nas',
        loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsModule)
    },
    {
        path: 'kontakt',
        loadChildren: () => import("./pages/contact/contact.module").then(m => m.ContactModule)
    },
    {
        path: 'zapisane-produkty',
        loadChildren: () => import("./pages/favourites/favourites.module").then(m => m.FavouritesModule)
    },
    {
        path: 'koszyk',
        loadChildren: () => import("./pages/cart/cart.module").then(m => m.CartModule)
    },
    {
        path: 'produkt',
        loadChildren: () => import("./pages/product/product.module").then(m => m.ProductModule)
    },
    {
        path: 'pomieszczenie',
        loadChildren: () => import("./pages/room/room.module").then(m => m.RoomModule)
    },
    {
        path: 'kategoria',
        loadChildren: () => import("./pages/category/category.module").then(m => m.CategoryModule)
    },
    {
        path: 'aranzacja',
        loadChildren: () => import("./pages/arrangment/arrangment.module").then(m => m.ArrangmentModule)
    },
    {
        path: 'reset',
        loadChildren: () => import("./pages/reset/reset.module").then(m => m.ResetModule)
    },
    {
        path: 'password-reset',
        loadChildren: () => import("./pages/password-reset/password-reset.module").then(m => m.PasswordResetModule)
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 128] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }