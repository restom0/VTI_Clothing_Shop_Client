import { useRef } from "react";
import PropTypes from "prop-types";
import { Card } from "@material-tailwind/react/components/Card";
import { Typography } from "@material-tailwind/react/components/Typography";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId } from "../../features/slices/select_id.slice";
import usePaginatedItems from "../../hooks/usePaginatedItems.hook";
import useSortedRows from "../../hooks/useSortedRows.hook";
import AdminPagination from "./admin/admin_pagination.component";
import SettingButton from "./admin/setting_button.component";
import TableHeader from "./header_table";
import { useI18n } from "../../i18n";

const ADMIN_TABLE_PAGE_SIZE = 24;
const ADMIN_TABLE_ROW_ESTIMATE = 64;

/** Gets total col span. */
const getTotalColSpan = (tableHead, noDelete, noUpdate) =>
  tableHead.reduce(
    (accumulator, currentValue) => accumulator + currentValue.col,
    !noDelete || !noUpdate ? 2 : 1
  );

/** Handles table. */
const Table = ({
  TABLE_HEAD,
  TABLE_ROWS,
  handleDetailOpen,
  handleUpdateOpen,
  handleDeleteOpen,
  updateContent,
  deleteContent,
  noUpdate,
  noDelete,
  isDeleted,
  isUpdated,
}) => {
  const { t } = useI18n();
  const active = useSelector((state) => state.active.value);
  const sort = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  const tableScrollRef = useRef(null);
  const sortedRows = useSortedRows(TABLE_ROWS, sort);
  const { pageCount, pageItems } = usePaginatedItems(sortedRows, active, ADMIN_TABLE_PAGE_SIZE);
  const rowVirtualizer = useVirtualizer({
    count: pageItems.length,
    /** Handles estimate size. */
    estimateSize: () => ADMIN_TABLE_ROW_ESTIMATE,
    /** Gets scroll element. */
    getScrollElement: () => tableScrollRef.current,
    overscan: 5,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const topPadding = virtualRows.length > 0 ? virtualRows[0].start : 0;
  const bottomPadding =
    virtualRows.length > 0 ? rowVirtualizer.getTotalSize() - virtualRows.at(-1).end : 0;
  const totalColSpan = getTotalColSpan(TABLE_HEAD, noDelete, noUpdate);
  /** Selects row. */
  const selectRow = (rowId) => {
    dispatch(setSelectedId(rowId));
    handleDetailOpen?.();
  };

  return (
    <Card>
      <div ref={tableScrollRef} className="admin-table-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <TableHeader TABLE_HEAD={TABLE_HEAD} noUpdate={noUpdate} noDelete={noDelete} />
          <tbody>
            {pageItems.length > 0 ? (
              <>
                {topPadding > 0 && (
                  <tr>
                    <td colSpan={totalColSpan} style={{ height: topPadding, padding: 0 }} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = pageItems[virtualRow.index];

                  return (
                    <tr key={row.id ?? virtualRow.key} className="border-b border-gray-200">
                      {Object.entries(row)
                        .slice(1)
                        .map(([key, value], index) => (
                          <td
                            key={key}
                            className="p-4"
                            onClick={() => selectRow(row.id)}
                            colSpan={TABLE_HEAD[index].col}
                          >
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {value}
                            </Typography>
                          </td>
                        ))}
                      {(!noDelete || !noUpdate) && (
                        <SettingButton
                          id={row.id}
                          handleDeleteOpen={handleDeleteOpen}
                          handleUpdateOpen={handleUpdateOpen}
                          updateContent={updateContent}
                          deleteContent={deleteContent}
                          noUpdate={noUpdate}
                          noDelete={noDelete}
                          isDeleted={isDeleted}
                          isUpdated={isUpdated}
                        />
                      )}
                    </tr>
                  );
                })}
                {bottomPadding > 0 && (
                  <tr>
                    <td colSpan={totalColSpan} style={{ height: bottomPadding, padding: 0 }} />
                  </tr>
                )}
              </>
            ) : (
              <tr className="border-b border-gray-200">
                <td className="p-4" colSpan={totalColSpan}>
                  {t("table.empty")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AdminPagination page={pageCount} />
    </Card>
  );
};

Table.propTypes = {
  TABLE_HEAD: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      col: PropTypes.number.isRequired,
    })
  ).isRequired,
  TABLE_ROWS: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContent: PropTypes.string,
  handleDeleteOpen: PropTypes.func,
  handleDetailOpen: PropTypes.func,
  handleUpdateOpen: PropTypes.func,
  isDeleted: PropTypes.bool,
  isUpdated: PropTypes.bool,
  noDelete: PropTypes.bool,
  noUpdate: PropTypes.bool,
  updateContent: PropTypes.string,
};

export default Table;
