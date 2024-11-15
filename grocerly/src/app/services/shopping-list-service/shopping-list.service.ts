import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShoppingList, ShoppingItem } from '../../models/shopping-list.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = `${environment.apiUrl}/shopping-lists`;
  private shoppingLists: ShoppingList[] = [];
  private shoppingListsSubject = new BehaviorSubject<ShoppingList[]>([]);

  constructor(private http: HttpClient) {
    this.loadShoppingLists();
  }

  private loadShoppingLists() {
    this.http.get<ShoppingList[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching shopping lists:', error);
          this.initializeMockData();
          return [];
        })
      )
      .subscribe(lists => {
        if (lists.length > 0) {
          this.shoppingLists = lists;
          this.shoppingListsSubject.next(this.shoppingLists);
        }
      });
  }

  private initializeMockData() {
    const mockLists: ShoppingList[] = [
      {
        id: 1,
        name: 'Grocery Shopping',
        items: [
          { name: 'Milk', quantity: 1, unit: 'gallon', isChecked: false },
          { name: 'Bread', quantity: 2, unit: 'loaf', isChecked: true },
          { name: 'Eggs', quantity: 1, unit: 'dozen', isChecked: false },
        ],
        createdDate: new Date('2023-05-01'),
        modifiedDate: new Date('2023-05-02')
      },
      {
        id: 2,
        name: 'Hardware Store',
        items: [
          { name: 'Screws', quantity: 20, unit: 'pcs', isChecked: false },
          { name: 'Paint', quantity: 1, unit: 'gallon', isChecked: false },
        ],
        createdDate: new Date('2023-05-03'),
        modifiedDate: new Date('2023-05-03')
      }
    ];

    this.shoppingLists = mockLists;
    this.shoppingListsSubject.next(this.shoppingLists);
  }

  getShoppingLists(): Observable<ShoppingList[]> {
    return this.shoppingListsSubject.asObservable();
  }

  addShoppingList(list: ShoppingList): Observable<ShoppingList> {
    return this.http.post<ShoppingList>(this.apiUrl, list).pipe(
      tap(newList => {
        this.shoppingLists.push(newList);
        this.shoppingListsSubject.next([...this.shoppingLists]);
      }),
      catchError(error => {
        console.error('Error adding shopping list:', error);
        throw error;
      })
    );
  }

  updateShoppingList(list: ShoppingList): Observable<ShoppingList> {
    return this.http.put<ShoppingList>(`${this.apiUrl}/${list.id}`, list).pipe(
      tap(updatedList => {
        const index = this.shoppingLists.findIndex(l => l.id === updatedList.id);
        if (index !== -1) {
          this.shoppingLists[index] = updatedList;
          this.shoppingListsSubject.next([...this.shoppingLists]);
        }
      }),
      catchError(error => {
        console.error('Error updating shopping list:', error);
        throw error;
      })
    );
  }

  deleteShoppingList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.shoppingLists = this.shoppingLists.filter(list => list.id !== id);
        this.shoppingListsSubject.next([...this.shoppingLists]);
      }),
      catchError(error => {
        console.error('Error deleting shopping list:', error);
        throw error;
      })
    );
  }

  addItemToList(listId: number, item: ShoppingItem): Observable<ShoppingList> {
    const list = this.shoppingLists.find(l => l.id === listId);
    if (!list) {
      throw new Error('List not found');
    }

    list.items.push(item);
    list.modifiedDate = new Date();
    return this.updateShoppingList(list);
  }

  removeItemFromList(listId: number, itemName: string): Observable<ShoppingList> {
    const list = this.shoppingLists.find(l => l.id === listId);
    if (!list) {
      throw new Error('List not found');
    }

    list.items = list.items.filter(item => item.name !== itemName);
    list.modifiedDate = new Date();
    return this.updateShoppingList(list);
  }
}
