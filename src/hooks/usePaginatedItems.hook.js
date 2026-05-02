import { useMemo } from "react";

const DEFAULT_PAGE_SIZE = 6;

export const getPageCount = (itemCount, pageSize = DEFAULT_PAGE_SIZE) =>
  Math.max(1, Math.ceil(itemCount / pageSize));

export const getPageItems = (items, page, pageSize = DEFAULT_PAGE_SIZE) => {
  const start = (page - 1) * pageSize;

  return items.slice(start, start + pageSize);
};

const usePaginatedItems = (items, page, pageSize = DEFAULT_PAGE_SIZE) =>
  useMemo(() => {
    const pageCount = getPageCount(items.length, pageSize);
    const safePage = Math.min(Math.max(page, 1), pageCount);

    return {
      pageCount,
      pageItems: getPageItems(items, safePage, pageSize),
    };
  }, [items, page, pageSize]);

export default usePaginatedItems;
