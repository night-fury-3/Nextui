import Table from './table';
import TableColumn from './table-column';
import TableFooter from './table-footer';
export type { TableProps } from './table';

import { Cell, Row, TableBody, TableHeader } from '@react-stately/table';

export {
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledTableHeaderCell
} from './table.styles';

export type {
  TableVariantsProps,
  TableColumnHeaderVariantsProps,
  TableCellVariantsProps,
  StyledTableRowGroup,
  StyledTableHeaderRow
} from './table.styles';

Table.Cell = Cell;
Table.Column = TableColumn;
Table.Header = TableHeader;
Table.Row = Row;
Table.Body = TableBody;
Table.Footer = TableFooter;

export default Table;
