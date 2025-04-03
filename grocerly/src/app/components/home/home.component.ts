import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: 'restaurant_menu',
      title: 'Curated Recipes',
      description: 'Discover hand-picked recipes from expert chefs'
    },
    {
      icon: 'local_shipping',
      title: 'Free Delivery',
      description: 'Get ingredients delivered to your doorstep'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Get help anytime you need it'
    }
  ];

  categories = ['All', 'Pizza', 'Asian', 'Drink', 'Salad', 'Burger'];
  selectedCategory = 'All';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
