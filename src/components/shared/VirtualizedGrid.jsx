import { memo, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useVirtualizer } from "@tanstack/react-virtual";

const DEFAULT_OVERSCAN = 3;

/**
 * VirtualizedGrid — performant grid với @tanstack/react-virtual.
 *
 * a11y:
 *  - role="grid" + aria-rowcount trên container
 *  - role="row"  + aria-rowindex trên từng hàng
 *  - role="gridcell" trên từng cell
 *
 * performance:
 *  - measureElement để tự đo chiều cao thực (auto-sizing)
 *  - React.memo ngăn re-render khi props không đổi
 *  - useCallback cho estimateSize
 */
const VirtualizedGrid = memo(
  ({
    className = "",
    columns,
    estimateRowHeight,
    getKey,
    items,
    overscan = DEFAULT_OVERSCAN,
    renderItem,
    "aria-label": ariaLabel,
  }) => {
    const parentRef = useRef(null);
    const rowCount = Math.ceil(items.length / columns);

    // Slice items vào rows — chỉ tính lại khi items / columns đổi
    /** Handles rows. */
    const rows = useMemo(
      () =>
        Array.from({ length: rowCount }, (_, rowIndex) =>
          items.slice(rowIndex * columns, rowIndex * columns + columns)
        ),
      [columns, items, rowCount]
    );

    // Memoize estimateSize tránh tạo function mới mỗi render
    /** Handles estimate size. */
    const estimateSize = useCallback(() => estimateRowHeight, [estimateRowHeight]);

    const rowVirtualizer = useVirtualizer({
      count: rowCount,
      estimateSize,
      /** Gets scroll element. */
      getScrollElement: () => parentRef.current,
      overscan,
      // measureElement: DOM node → đo chiều cao thực sau khi render
      // giúp layout chính xác khi card có chiều cao khác nhau
      measureElement:
        typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
          ? (element) => element?.getBoundingClientRect().height
          : undefined,
    });

    return (
      <div
        ref={parentRef}
        className={`virtual-scroll ${className}`.trim()}
        style={{ "--virtual-grid-columns": columns }}
        // WCAG 1.3.1: role="grid" + aria-rowcount cho screen reader
        role="grid"
        aria-label={ariaLabel}
        aria-rowcount={rowCount}
      >
        <div
          className="virtual-canvas"
          role="rowgroup"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              className="virtual-grid-row"
              key={virtualRow.key}
              // data-index phải có để measureElement hoạt động đúng
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              role="row"
              // aria-rowindex bắt đầu từ 1 theo ARIA spec
              aria-rowindex={virtualRow.index + 1}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {rows[virtualRow.index].map((item, columnIndex) => (
                <div key={getKey(item, columnIndex)} role="gridcell">
                  {renderItem(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

VirtualizedGrid.displayName = "VirtualizedGrid";

VirtualizedGrid.propTypes = {
  "aria-label": PropTypes.string,
  className: PropTypes.string,
  columns: PropTypes.number.isRequired,
  estimateRowHeight: PropTypes.number.isRequired,
  getKey: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  overscan: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
};

export default VirtualizedGrid;
