import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  tourId: string;
  title: string;
  price: number;
  date: string;
  travelers: number;
  image: string;
  destination: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (tourId: string) => void;
  updateCartItem: (tourId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.tourId === item.tourId);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.tourId === item.tourId ? { ...i, ...item } : i
              )
            };
          }
          return { items: [...state.items, item] };
        });
      },
      
      removeFromCart: (tourId) => {
        set((state) => ({
          items: state.items.filter(item => item.tourId !== tourId)
        }));
      },
      
      updateCartItem: (tourId, updates) => {
        set((state) => ({
          items: state.items.map(item =>
            item.tourId === tourId ? { ...item, ...updates } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.travelers), 0);
      },
      
      getItemCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);