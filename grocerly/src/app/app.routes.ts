import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';  

import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recipes/new', component: RecipeFormComponent, canActivate: [authGuard] },
    { path: 'recipes/:id/edit', component: RecipeFormComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/home' }
];
