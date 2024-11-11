import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';  
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shoppingLists', component: ShoppingListsComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '/home' }
];
