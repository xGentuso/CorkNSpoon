import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '../../../models/recipe.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() deleted = new EventEmitter<number>();

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  viewRecipe() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  editRecipe() {
    this.router.navigate(['/recipes', this.recipe.id, 'edit']);
  }

  deleteRecipe() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Recipe',
        message: `Are you sure you want to delete ${this.recipe.title}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.recipe.id);
      }
    });
  }

  getTimeDisplay(minutes: number | null | undefined): string {
    if (!minutes || isNaN(minutes)) {
      return '--';
    }
    return `${minutes} min`;
  }

  formatTime(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    return `${minutes}m`;
  }
}
