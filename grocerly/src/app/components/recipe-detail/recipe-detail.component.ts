import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoodSearchService } from '../../services/food-search/food-search.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private foodSearchService: FoodSearchService
  ) {}

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.loadRecipe(recipeId);
    }
  }

  private loadRecipe(id: string) {
    this.foodSearchService.getFeedsList().subscribe({
      next: (response) => {
        const recipeData = response.feed.find((item: any) => item.content.details.id === id);
        if (recipeData) {
          const totalTime = parseInt(recipeData.content.details.totalTime?.toString().replace(' min', '') || '0');
          
          const sourceUrl = recipeData.content.details.directionsUrl || '';
          
          this.recipe = {
            id: Number(recipeData.content.details.id),
            title: recipeData.display.displayName,
            description: recipeData.content.description?.text || '',
            imageUrl: this.getImageUrl(recipeData.display.images),
            prepTime: totalTime,
            cookTime: totalTime,
            servings: recipeData.content.details.numberOfServings || 0,
            difficulty: 'Medium',
            ingredients: recipeData.content.ingredientLines?.map((ing: any) => ing.ingredient) || [],
            instructions: ['For full instructions, please visit:', sourceUrl],
            category: recipeData.content.tags?.course?.[0]?.['display-name'] || 'Dinner'
          };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
        this.error = 'Failed to load recipe details';
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
}
