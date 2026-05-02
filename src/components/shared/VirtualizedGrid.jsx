import { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useVirtualizer } from "@tanstack/react-virtual";

const DEFAULT_OVERSCAN = 3;

const VirtualizedGrid = ({
  className = "",
  columns,
  estimateRowHeight,
  getKey,
  items,
  overscan = DEFAULT_OVERSCAN,
  renderItem,
}) => {
  const parentRef = useRef(null);
  const rowCount = Math.ceil(items.length / columns);
  const rows = useMemo(
    () =>
      Array.from({ length: rowCount }, (_, rowIndex) =>
        items.slice(rowIndex * columns, rowIndex * columns + columns)
      ),
    [columns, items, rowCount]
  );

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    estimateSize: () => estimateRowHeight,
    getScrollElement: () => parentRef.current,
    overscan,
  });

  return (
    <div
      ref={parentRef}
      className={`virtual-scroll ${className}`.trim()}
      style={{ "--virtual-grid-columns": columns }}
    >
      <div
        className="virtual-canvas"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            className="virtual-grid-row"
            key={virtualRow.key}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            {rows[virtualRow.index].map((item, columnIndex) => (
              <div key={getKey(item, columnIndex)}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

VirtualizedGrid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.number.isRequired,
  estimateRowHeight: PropTypes.number.isRequired,
  getKey: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  overscan: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
};

export default VirtualizedGrid;
