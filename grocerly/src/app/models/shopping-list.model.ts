// src/app/models/shopping-list.model.ts

export interface ShoppingItem {
  name: string;
  isChecked: boolean;
  quantity: number;
  unit: string;
}

export interface ShoppingList {
  id: number;
  name: string;
  items: ShoppingItem[];
  createdDate: Date;
  modifiedDate: Date;
}
