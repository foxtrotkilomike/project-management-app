import { Col } from 'react-bootstrap';

interface Column {
  title: string;
  order: number;
  boardId: string;
}

interface ColumnsResponse extends Column {
  _id: string;
}

type CreatedColumn = Omit<Column, 'boardId'>;

export type { Column, ColumnsResponse, CreatedColumn };
