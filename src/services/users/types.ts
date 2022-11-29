type User = {
  name: string;
  login: string;
  password: string;
};

type UserResponse = {
  _id: string;
  name: string;
  login: string;
};

export type { User, UserResponse };
