import axios from "../../../lib/axiosSetUp";
import { PostModel } from "../../../models";
import { LikeModel, PageRequest } from "../types";

class PostService {
  async get(request: PageRequest) {
    let url = `/posts?_page=${request.page}&_limit=${request.limit}`;
    if (request.searchParam && request.searchParam !== "")
      url = `${url}&authorName=${request.searchParam}`;

    return await axios.get(url);
  }

  async add(newPost: PostModel) {
    return await axios.post<PostModel>("/posts", JSON.stringify(newPost));
  }

  async like(request: LikeModel) {
    return await axios.put(
      `/posts/${request.likedPost.id}`,
      JSON.stringify(request.likedPost)
    );
  }

  async delete(postId: number) {
    return await axios.delete(`/posts/${postId}`);
  }
}

export default new PostService();
