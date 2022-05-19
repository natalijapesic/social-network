import { CommentModel } from "../../../models/comment";
import axios from "../../../lib/axiosSetUp";

class CommentService {
  async get() {
    const response = await axios.get<CommentModel[]>(`/comments`);
    return response;
  }

  async add(newComment: CommentModel) {
    const response = await axios.post<CommentModel>(
      "/comments",
      JSON.stringify(newComment)
    );
    return response;
  }
}

export default new CommentService();
