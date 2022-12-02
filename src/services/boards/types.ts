interface Board {
  title: string;
  owner: string;
  users: string[];
}

interface BoardsResponse extends Board {
  _id: string;
}

export type { Board, BoardsResponse };
