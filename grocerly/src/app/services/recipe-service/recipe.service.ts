import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Recipe, CreateRecipeDTO, UpdateRecipeDTO } from '../../models/recipe.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRecipes(params?: {
    category?: string;
    difficulty?: string;
    search?: string;
  }): Observable<Recipe[]> {
    let httpParams = new HttpParams();
    
    if (params?.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params?.difficulty) {
      httpParams = httpParams.set('difficulty', params.difficulty);
    }
    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<Recipe[]>(this.apiUrl, { params: httpParams })
      .pipe(
        tap(recipes => this.recipesSubject.next(recipes)),
        tap({
          error: (error) => {
            console.error('Recipe API Error:', error);
          }
        })
      );
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  createRecipe(recipe: CreateRecipeDTO): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe)
      .pipe(
        tap(newRecipe => {
          const currentRecipes = this.recipesSubject.value;
          this.recipesSubject.next([...currentRecipes, newRecipe]);
        })
      );
  }

  updateRecipe(id: number, recipe: UpdateRecipeDTO): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe)
      .pipe(
        tap(updatedRecipe => {
          const currentRecipes = this.recipesSubject.value;
          const index = currentRecipes.findIndex(r => r.id === id);
          if (index !== -1) {
            currentRecipes[index] = updatedRecipe;
            this.recipesSubject.next([...currentRecipes]);
          }
        })
      );
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentRecipes = this.recipesSubject.value;
          this.recipesSubject.next(currentRecipes.filter(recipe => recipe.id !== id));
        })
      );
  }

  // Helper method to refresh recipes
  refreshRecipes(): void {
    this.getRecipes().subscribe();
  }
}
