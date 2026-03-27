import { describe, it, expect, beforeEach } from 'vitest';
import { useProductsStore } from '../useProductsStore.ts';

describe('useProductsStore', () => {
  beforeEach(() => {
    useProductsStore.setState({
      localProducts: [],
      sortBy: '',
      order: 'asc',
      search: '',
      page: 1,
    });
  });

  describe('setSortBy', () => {
    it('sets sortBy field and resets page', () => {
      useProductsStore.getState().setPage(3);
      useProductsStore.getState().setSortBy('price');

      const state = useProductsStore.getState();
      expect(state.sortBy).toBe('price');
      expect(state.order).toBe('asc');
      expect(state.page).toBe(1);
    });

    it('toggles order when same field is clicked', () => {
      useProductsStore.getState().setSortBy('price');
      expect(useProductsStore.getState().order).toBe('asc');

      useProductsStore.getState().setSortBy('price');
      expect(useProductsStore.getState().order).toBe('desc');
    });

    it('resets to asc when different field is clicked', () => {
      useProductsStore.getState().setSortBy('price');
      useProductsStore.getState().setSortBy('price'); // desc
      useProductsStore.getState().setSortBy('rating'); // new field -> asc

      expect(useProductsStore.getState().order).toBe('asc');
    });
  });

  describe('toggleOrder', () => {
    it('toggles from asc to desc', () => {
      useProductsStore.getState().toggleOrder();
      expect(useProductsStore.getState().order).toBe('desc');
    });

    it('toggles from desc to asc', () => {
      useProductsStore.setState({ order: 'desc' });
      useProductsStore.getState().toggleOrder();
      expect(useProductsStore.getState().order).toBe('asc');
    });
  });

  describe('setSearch', () => {
    it('updates search and resets page', () => {
      useProductsStore.getState().setPage(5);
      useProductsStore.getState().setSearch('phone');

      expect(useProductsStore.getState().search).toBe('phone');
      expect(useProductsStore.getState().page).toBe(1);
    });
  });

  describe('addLocalProduct', () => {
    it('adds product with negative ID', () => {
      useProductsStore.getState().addLocalProduct({
        title: 'Test',
        price: 100,
        brand: 'Brand',
        sku: 'SKU-001',
      });

      const products = useProductsStore.getState().localProducts;
      expect(products).toHaveLength(1);
      expect(products[0].id).toBeLessThan(0);
      expect(products[0].title).toBe('Test');
      expect(products[0].price).toBe(100);
    });

    it('prepends new products', () => {
      useProductsStore.getState().addLocalProduct({ title: 'First', price: 1, brand: 'B', sku: 'S1' });
      useProductsStore.getState().addLocalProduct({ title: 'Second', price: 2, brand: 'B', sku: 'S2' });

      const products = useProductsStore.getState().localProducts;
      expect(products[0].title).toBe('Second');
      expect(products[1].title).toBe('First');
    });
  });
});
