import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from '../../services/recipe-service/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEditing = false;
  recipeId?: number;
  isLoading = false;

  categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.recipeForm = this.createForm();
  }

  ngOnInit() {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.recipeId) {
      this.isEditing = true;
      this.loadRecipe();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', Validators.required],
      prepTime: [0, [Validators.required, Validators.min(0)]],
      cookTime: [0, [Validators.required, Validators.min(0)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      difficulty: ['Medium', Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([])
    });
  }

  private loadRecipe() {
    if (!this.recipeId) return;
    
    this.isLoading = true;
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        this.patchFormWithRecipe(recipe);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
        this.snackBar.open('Error loading recipe', 'Close', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }
    });
  }

  private patchFormWithRecipe(recipe: Recipe) {
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      category: recipe.category
    });

    // Clear and rebuild form arrays
    this.ingredients.clear();
    recipe.ingredients.forEach((ingredient: string) => {
      this.ingredients.push(this.fb.control(ingredient));
    });

    this.instructions.clear();
    recipe.instructions.forEach(instruction => {
      this.instructions.push(this.fb.control(instruction));
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control(''));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.isLoading = true;
      const recipeData = this.recipeForm.value;

      if (this.isEditing && this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe({
          next: () => this.handleSuccess('Recipe updated successfully'),
          error: (error) => this.handleError(error)
        });
      } else {
        this.recipeService.createRecipe(recipeData).subscribe({
          next: () => this.handleSuccess('Recipe created successfully'),
          error: (error) => this.handleError(error)
        });
      }
    }
  }

  private handleSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.router.navigate(['/recipes']);
  }

  private handleError(error: any) {
    console.error('Error saving recipe:', error);
    this.snackBar.open('Error saving recipe', 'Close', { duration: 3000 });
    this.isLoading = false;
  }
} 