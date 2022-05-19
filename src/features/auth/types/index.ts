import { UserModel } from "../../../models";

export type AuthState = {
  user: UserModel | null;
  status: string;
  error: string | undefined;
};

export type SignUpRequest = {
  username: string;
  password: string;
  email: string;
};

export type UserResponse = {
  user: UserModel;
  accessToken: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};
