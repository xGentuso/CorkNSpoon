import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
// Assuming the service path is incorrect and needs to be adjusted
import { FoodSearchService } from '../../services/food-search/food-search.service';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
  isChecked: boolean;
  image?: string;
  unit: string;
}

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  groceryList: GroceryItem[] = [];
  searchQuery: string = '';
  autoCompleteResults: string[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private searchSubject = new Subject<string>();
  searchResults: any[] = [];

  constructor(private foodSearchService: FoodSearchService) {}

  ngOnInit() {
    this.setupAutoComplete();
  }

  private setupAutoComplete() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length < 2) return of([]);
        this.isLoading = true;
        return this.foodSearchService.getAutoComplete(query).pipe(
          catchError(error => {
            console.error('Auto-complete error:', error);
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (response) => {
        this.autoCompleteResults = response.map((item: any) => item.display.displayName);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to fetch suggestions';
        this.isLoading = false;
      }
    });
  }

  onSearchInput(query: string) {
    this.searchSubject.next(query);
  }

  searchProducts() {
    if (!this.searchQuery) return;
    
    this.isLoading = true;
    this.foodSearchService.searchFeed(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.feed;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.error = 'Failed to search products';
        this.isLoading = false;
      }
    });
  }

  addToList(item: string): void {
    this.groceryList.push({
      name: item,
      isChecked: false,
      quantity: 1,
      unit: 'item',
      id: 0
    });
    
    this.searchQuery = '';
    this.autoCompleteResults = [];
  }

  removeItem(index: number) {
    this.groceryList.splice(index, 1);
  }

  toggleItemCheck(item: GroceryItem) {
    item.isChecked = !item.isChecked;
  }

  updateQuantity(item: GroceryItem, increment: boolean) {
    if (increment) {
      item.quantity++;
    } else if (item.quantity > 1) {
      item.quantity--;
    }
  }
}
