import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: 'menu_book',
      title: 'Recipe Collection',
      description: 'Browse through our extensive collection of recipes'
    },
    {
      icon: 'shopping_cart',
      title: 'Smart Shopping Lists',
      description: 'Create and manage your grocery shopping lists'
    },
    {
      icon: 'favorite',
      title: 'Save Favorites',
      description: 'Save your favorite recipes for quick access'
    }
  ];
}
