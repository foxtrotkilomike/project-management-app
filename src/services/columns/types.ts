interface Column {
  title: string;
  order: number;
  boardId: string;
}

interface ColumnsResponse extends Column {
  _id: string;
}

export type { Column, ColumnsResponse };
