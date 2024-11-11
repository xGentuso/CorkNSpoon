import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Add more methods as needed
}
