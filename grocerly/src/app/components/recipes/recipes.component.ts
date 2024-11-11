import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe-service/recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: string[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    // Temporarily using mock data until backend is ready
    this.recipes = this.getMockRecipes();
    this.filteredRecipes = this.recipes;
    this.isLoading = false;
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes
      .filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategory === 'All' || recipe.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'orange';
      case 'Hard': return 'red';
      default: return 'black';
    }
  }

  private getMockRecipes(): Recipe[] {
    return [
      {
        id: 1,
        title: 'Classic Spaghetti Carbonara',
        description: 'A creamy Italian pasta dish with eggs, cheese, pancetta, and black pepper. Traditional Roman comfort food at its finest.',
        imageUrl: 'assets/images/recipes/spaghetti-carbonara.jpg',
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
          '400g spaghetti',
          '200g pancetta or guanciale',
          '4 large eggs',
          '100g Pecorino Romano cheese',
          '100g Parmigiano Reggiano',
          'Black pepper',
          'Salt'
        ],
        instructions: [
          'Boil pasta in salted water',
          'Cook pancetta until crispy',
          'Mix eggs and cheese',
          'Combine all ingredients while pasta is hot'
        ],
        category: 'Dinner'
      },
      {
        id: 2,
        title: 'Avocado Toast with Poached Eggs',
        description: 'A healthy and delicious breakfast featuring creamy avocado, perfectly poached eggs, and whole grain toast.',
        imageUrl: 'assets/images/recipes/avocado-toast.jpg',
        prepTime: 10,
        cookTime: 5,
        servings: 2,
        difficulty: 'Easy',
        ingredients: [
          '2 slices whole grain bread',
          '1 ripe avocado',
          '2 fresh eggs',
          'Salt and pepper',
          'Red pepper flakes',
          'Fresh herbs'
        ],
        instructions: [
          'Toast the bread',
          'Mash avocado and season',
          'Poach eggs',
          'Assemble and garnish'
        ],
        category: 'Breakfast'
      },
      {
        id: 3,
        title: 'Chocolate Lava Cake',
        description: 'Decadent individual chocolate cakes with a gooey molten center. Perfect for chocolate lovers!',
        imageUrl: 'assets/images/recipes/lava-cake.jpg',
        prepTime: 15,
        cookTime: 12,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
          '200g dark chocolate',
          '200g butter',
          '4 eggs',
          '200g sugar',
          '120g flour',
          'Vanilla extract',
          'Pinch of salt'
        ],
        instructions: [
          'Melt chocolate and butter',
          'Mix eggs and sugar',
          'Combine ingredients',
          'Bake until edges are set but center is soft'
        ],
        category: 'Dessert'
      },
      {
        id: 4,
        title: 'Greek Salad',
        description: 'Fresh and crisp traditional Greek salad with tomatoes, cucumbers, olives, and feta cheese.',
        imageUrl: 'assets/images/recipes/greek-salad.jpg',
        prepTime: 15,
        cookTime: 0,
        servings: 4,
        difficulty: 'Easy',
        ingredients: [
          'Cucumber',
          'Tomatoes',
          'Red onion',
          'Kalamata olives',
          'Feta cheese',
          'Olive oil',
          'Oregano'
        ],
        instructions: [
          'Chop vegetables',
          'Combine in bowl',
          'Add feta and olives',
          'Dress with olive oil and oregano'
        ],
        category: 'Lunch'
      },
      {
        id: 5,
        title: 'Homemade Pizza',
        description: 'Create your own perfect pizza with a crispy crust and your favorite toppings.',
        imageUrl: 'assets/images/recipes/homemade-pizza.jpg',
        prepTime: 30,
        cookTime: 15,
        servings: 4,
        difficulty: 'Hard',
        ingredients: [
          'Pizza dough',
          'Tomato sauce',
          'Mozzarella',
          'Fresh basil',
          'Olive oil',
          'Choice of toppings'
        ],
        instructions: [
          'Prepare dough',
          'Add sauce and toppings',
          'Bake in hot oven',
          'Garnish with fresh basil'
        ],
        category: 'Dinner'
      },
      {
        id: 6,
        title: 'Fruit Smoothie Bowl',
        description: 'A nutritious and Instagram-worthy breakfast bowl packed with fruits and toppings.',
        imageUrl: 'assets/images/recipes/smoothie-bowl.jpeg',
        prepTime: 10,
        cookTime: 0,
        servings: 1,
        difficulty: 'Easy',
        ingredients: [
          'Frozen mixed berries',
          'Banana',
          'Greek yogurt',
          'Honey',
          'Granola',
          'Chia seeds',
          'Fresh fruit for topping'
        ],
        instructions: [
          'Blend frozen fruits',
          'Add yogurt and honey',
          'Pour into bowl',
          'Add toppings'
        ],
        category: 'Breakfast'
      },
      {
        id: 7,
        title: 'Beef Stir Fry',
        description: 'Quick and flavorful Asian-inspired beef stir fry with vegetables and rice.',
        imageUrl: 'assets/images/recipes/beef-stirfry.jpg',
        prepTime: 20,
        cookTime: 15,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [
          'Beef strips',
          'Mixed vegetables',
          'Soy sauce',
          'Garlic',
          'Ginger',
          'Rice',
          'Sesame oil'
        ],
        instructions: [
          'Prepare rice',
          'Marinate beef',
          'Stir fry vegetables',
          'Combine and sauce'
        ],
        category: 'Dinner'
      },
      {
        id: 8,
        title: 'Energy Balls',
        description: 'Healthy no-bake energy balls perfect for a quick snack or pre-workout boost.',
        imageUrl: 'assets/images/recipes/energy-balls.webp',
        prepTime: 15,
        cookTime: 0,
        servings: 12,
        difficulty: 'Easy',
        ingredients: [
          'Dates',
          'Nuts',
          'Oats',
          'Chia seeds',
          'Cocoa powder',
          'Honey',
          'Coconut flakes'
        ],
        instructions: [
          'Process dates and nuts',
          'Mix in other ingredients',
          'Form balls',
          'Roll in coconut'
        ],
        category: 'Snacks'
      }
    ];
  }
}
