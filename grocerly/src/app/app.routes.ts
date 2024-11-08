import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';  
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shoppingLists', component: ShoppingListsComponent},
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '/home' }
];
