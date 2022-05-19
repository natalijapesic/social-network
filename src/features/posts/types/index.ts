import { PostModel } from "../../../models";

export type PostState = {
  posts: PostModel[];
  status: string;
  error: string | undefined;
  searchParam: string;
};

export type LikeModel = {
  likedPost: PostModel;
  userId: number;
};

export type PageRequest = {
  page: number;
  limit: number;
  searchParam?: string;
};
