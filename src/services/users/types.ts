type UserData = {
  name: string;
  login: string;
  password: string;
};

type UserResponseData = {
  _id: string;
  name: string;
  login: string;
};

export type { UserData, UserResponseData };
