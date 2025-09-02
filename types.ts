
export interface Price {
  M?: number;
  L: number;
}

export interface MenuItem {
  id: number;
  name: string;
  englishName: string;
  price: Price;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface CartItem {
  id: string; // Composite key like `menuItemId-size-sugarLevel-iceLevel`
  menuItemId: number;
  name: string;
  size: 'M' | 'L';
  sugarLevel: string;
  iceLevel: string;
  quantity: number;
  unitPrice: number;
}