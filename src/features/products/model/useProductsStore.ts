import { create } from 'zustand';
import type { NewProduct, Product } from '@/shared/types/index.ts';

interface ProductsState {
  localProducts: Product[];
  sortBy: string;
  order: 'asc' | 'desc';
  search: string;
  page: number;
  setSortBy: (field: string) => void;
  toggleOrder: () => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  addLocalProduct: (product: NewProduct) => void;
}

let nextLocalId = -1;

export const useProductsStore = create<ProductsState>((set) => ({
  localProducts: [],
  sortBy: '',
  order: 'asc',
  search: '',
  page: 1,

  setSortBy: (field) =>
    set((state) => ({
      sortBy: field,
      order: state.sortBy === field && state.order === 'asc' ? 'desc' : 'asc',
      page: 1,
    })),

  toggleOrder: () =>
    set((state) => ({
      order: state.order === 'asc' ? 'desc' : 'asc',
    })),

  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),

  addLocalProduct: (data) =>
    set((state) => ({
      localProducts: [
        {
          id: nextLocalId--,
          title: data.title,
          description: '',
          category: '',
          price: data.price,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          tags: [],
          brand: data.brand,
          sku: data.sku,
          weight: 0,
          dimensions: { width: 0, height: 0, depth: 0 },
          warrantyInformation: '',
          shippingInformation: '',
          availabilityStatus: 'In Stock',
          reviews: [],
          returnPolicy: '',
          minimumOrderQuantity: 1,
          meta: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            barcode: '',
            qrCode: '',
          },
          thumbnail: '',
          images: [],
        },
        ...state.localProducts,
      ],
    })),
}));
