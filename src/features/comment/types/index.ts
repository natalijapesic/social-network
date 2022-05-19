import { CommentModel } from "../../../models/comment";

export type CommentState = {
  list: CommentModel[];
  status: string;
  error: string | undefined;
};
