import { useMemo, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts, useProductsStore } from '@/features/products/index.ts';
import { AddProductModal } from '@/features/products/ui/AddProductModal.tsx';
import { Pagination } from '@/shared/ui/Pagination/index.ts';
import { formatPrice } from '@/shared/lib/index.ts';
import { debounce } from '@/shared/lib/index.ts';
import {
  SearchIcon,
  RefreshIcon,
  CirclePlusIcon,
  PlusPillIcon,
  DotsCircleIcon,
} from '@/shared/ui/Icons/index.ts';
import { t } from '@/shared/lib/i18n/index.ts';
import styles from './ProductsPage.module.scss';

const ITEMS_PER_PAGE = 20;

export function ProductsPage() {
  const queryClient = useQueryClient();
  const {
    sortBy,
    order,
    search,
    page,
    localProducts,
    setSortBy,
    setSearch,
    setPage,
  } = useProductsStore();

  const [searchInput, setSearchInput] = useState(search);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [setSearch],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      debouncedSetSearch(e.target.value);
    },
    [debouncedSetSearch],
  );

  const params = useMemo(
    () => ({
      limit: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      ...(sortBy ? { sortBy, order } : {}),
      ...(search ? { q: search } : {}),
    }),
    [page, sortBy, order, search],
  );

  const { data, isLoading, isFetching } = useProducts(params);

  const products = useMemo(() => {
    const apiProducts = data?.products ?? [];
    if (page === 1 && !search) {
      return [...localProducts, ...apiProducts];
    }
    return apiProducts;
  }, [data?.products, localProducts, page, search]);

  const total = (data?.total ?? 0) + (search ? 0 : localProducts.length);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return order === 'asc' ? ' \u2191' : ' \u2193';
  };

  const handleColumnSort = (field: string) => {
    setSortBy(field);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>{t.products.title}</h1>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder={t.products.searchPlaceholder}
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <h2 className={styles.sectionTitle}>{t.products.allItems}</h2>
        </div>
        <div className={styles.toolbarRight}>
          <button className={styles.refreshBtn} onClick={handleRefresh} aria-label={t.common.refresh}>
            <RefreshIcon />
          </button>
          <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
            <CirclePlusIcon />
            {t.products.add}
          </button>
        </div>
      </div>

      {/* Loading bar */}
      {(isLoading || isFetching) && (
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarInner} />
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCol}>
                <input
                  type="checkbox"
                  checked={products.length > 0 && selectedIds.size === products.length}
                  onChange={() => {
                    if (selectedIds.size === products.length) {
                      setSelectedIds(new Set());
                    } else {
                      setSelectedIds(new Set(products.map((p) => p.id)));
                    }
                  }}
                />
              </th>
              <th
                className={styles.sortable}
                onClick={() => handleColumnSort('title')}
              >
                {t.table.name}{renderSortIcon('title')}
              </th>
              <th>{t.table.vendor}</th>
              <th>{t.table.sku}</th>
              <th
                className={styles.sortable}
                onClick={() => handleColumnSort('rating')}
              >
                {t.table.rating}{renderSortIcon('rating')}
              </th>
              <th
                className={styles.sortable}
                onClick={() => handleColumnSort('price')}
              >
                {t.table.price}{renderSortIcon('price')}
              </th>
              <th className={styles.actionsCol}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isSelected = selectedIds.has(product.id);
              return (
              <tr
                key={product.id}
                className={`${styles.row} ${isSelected ? styles.selectedRow : ''}`}
                onClick={() => toggleSelect(product.id)}
              >
                <td className={styles.checkboxCol}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className={isSelected ? styles.checkboxSelected : undefined}
                  />
                </td>
                <td>
                  <div className={styles.productCell}>
                    {product.thumbnail && (
                      <img
                        className={styles.thumbnail}
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                      />
                    )}
                    <div>
                      <div className={styles.productTitle}>{product.title}</div>
                      <div className={styles.productCategory}>{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.vendorCell}>{product.brand ?? '—'}</td>
                <td>{product.sku}</td>
                <td>
                  <span className={product.rating < 3.5 ? styles.ratingLow : undefined}>
                    {product.rating}
                  </span>
                  <span>/5</span>
                </td>
                <td>
                  <span className={styles.priceWhole}>{formatPrice(product.price).split(',')[0]}</span>
                  <span className={styles.priceDecimal}>,{formatPrice(product.price).split(',')[1]}</span>
                </td>
                <td className={styles.actionsCol}>
                  <button className={styles.actionBtn} aria-label={t.products.add} onClick={(e) => e.stopPropagation()}>
                    <PlusPillIcon />
                  </button>
                  <button className={styles.actionBtn} aria-label={t.common.more} onClick={(e) => e.stopPropagation()}>
                    <DotsCircleIcon />
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>

        {!isLoading && products.length === 0 && (
          <div className={styles.empty}>{t.products.noResults}</div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.showing}>
          {t.products.showing} <span className={styles.showingBold}>{Math.min((page - 1) * ITEMS_PER_PAGE + 1, total)}-{Math.min(page * ITEMS_PER_PAGE, total)}</span> {t.products.of} <span className={styles.showingBold}>{total}</span>
        </span>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
