interface Column {
  title: string;
  order: number;
  boardId: string;
}

interface ColumnsResponse extends Column {
  _id: string;
}

type CreatedColumn = Omit<Column, 'boardId'>;
type UpdatedOrderColumn = {
  _id: string;
  order: number;
};

export type { Column, ColumnsResponse, CreatedColumn, UpdatedOrderColumn };
