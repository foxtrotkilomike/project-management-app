interface Board {
  title: string;
  owner: string;
  users: string[];
}

interface BoardsResponse extends Board {
  _id: string;
}

interface BoardFilled extends BoardsResponse {
  ownerName: string;
}

export type { Board, BoardsResponse, BoardFilled };
