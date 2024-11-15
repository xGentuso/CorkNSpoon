import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe-service/recipe.service';
import { environment } from '../../../environments/environment';
import { FoodSearchService } from '../../services/food-search/food-search.service';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    RecipeCardComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  isLoading = false;
  error: string | null = null;
  searchQuery = '';
  selectedCategory = '';
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

  ngOnInit() {
    this.loadRecipes();
  }
  
  constructor(
    private recipeService: RecipeService,
    private foodSearchService: FoodSearchService,  // Add this
    private snackBar: MatSnackBar
  ) {}

  loadRecipes() {
    this.isLoading = true;
    this.error = null;

    this.foodSearchService.getFeedsList().subscribe({
      next: (response) => {
        this.recipes = response.feed.map((item: any) => {
          const totalTime = item.content.details.totalTime 
            ? parseInt(item.content.details.totalTime.toString().replace(/\D/g, ''))
            : null;
          
          return {
            id: item.content.details.id,
            title: item.display.displayName,
            description: item.content.description?.text || '',
            imageUrl: this.getImageUrl(item.display.images),
            prepTime: totalTime,
            cookTime: totalTime,
            servings: item.content.details.numberOfServings || 0,
            difficulty: 'Medium',
            ingredients: item.content.ingredientLines?.map((ing: any) => ing.ingredient) || [],
            instructions: item.content.preparationSteps || [],
            category: this.determineCategory(item.content.details)
          };
        });
        this.filteredRecipes = this.recipes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.error = 'Failed to load recipes. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private getImageUrl(images: any[]): string {
    if (!images || images.length === 0) {
      return 'assets/default-recipe.jpg';
    }
    return images[0].hostedLargeUrl || images[0].hostedUrl || images[0];
  }

  private determineCategory(details: any): string {
    // Check if it's a breakfast item
    if (details.keywords?.some((keyword: string) => 
      keyword.toLowerCase().includes('breakfast') || 
      keyword.toLowerCase().includes('pancake') ||
      keyword.toLowerCase().includes('waffle'))) {
      return 'Breakfast';
    }
    
    // Check if it's a dessert
    if (details.keywords?.some((keyword: string) => 
      keyword.toLowerCase().includes('dessert') ||
      keyword.toLowerCase().includes('cake') ||
      keyword.toLowerCase().includes('cookie'))) {
      return 'Dessert';
    }
    
    // For main dishes, determine based on protein type
    if (details.keywords?.some((keyword: string) => 
      keyword.toLowerCase().includes('chicken') ||
      keyword.toLowerCase().includes('beef') ||
      keyword.toLowerCase().includes('fish') ||
      keyword.toLowerCase().includes('salmon'))) {
      return 'Dinner';
    }
    
    // For lighter dishes
    if (details.keywords?.some((keyword: string) => 
      keyword.toLowerCase().includes('salad') ||
      keyword.toLowerCase().includes('sandwich'))) {
      return 'Lunch';
    }
    
    // If no specific category can be determined
    return 'Dinner'; // Default to Dinner instead of Uncategorized
  }

  filterRecipes(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const matchesSearch = this.searchQuery ? 
        recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : 
        true;
      const matchesCategory = this.selectedCategory ? 
        recipe.category === this.selectedCategory : 
        true;
      return matchesSearch && matchesCategory;
    });
  }

  // Add method to get similar recipes
  getSimilarRecipes(recipeId: string) {
    this.foodSearchService.getFeedSimilarities(recipeId).subscribe({
      next: (response) => {
        // Handle similar recipes
        console.log('Similar recipes:', response);
      },
      error: (error) => {
        console.error('Error fetching similar recipes:', error);
      }
    });
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#4CAF50';  // green
      case 'medium':
        return '#FF9800';  // orange
      case 'hard':
        return '#f44336';  // red
      default:
        return '#000000';  // black
    }
  }

  deleteRecipe(recipeId: string): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(Number(recipeId)).subscribe({
        next: () => {
          this.loadRecipes();
        },
        error: (error) => {
          this.error = 'Failed to delete recipe';
          console.error(error);
        }
      });
    }
  }

  private mapCategory(tag: string): string {
    // Map to your predefined categories
    const categoryMap: { [key: string]: string } = {
      'breakfast-brunch': 'Breakfast',
      'lunch': 'Lunch',
      'dinner': 'Dinner',
      'dessert': 'Dessert',
      'snack': 'Snack'
    };
    
    return categoryMap[tag?.toLowerCase()] || tag;
  }

  getTimeDisplay(minutes: number | null | undefined): string {
    if (!minutes || isNaN(minutes)) {
      return '--';
    }

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (remainingMinutes === 0) {
        return `${hours} hr`;
      }
      return `${hours} hr ${remainingMinutes} min`;
    }
    
    return `${minutes} min`;
  }
}
