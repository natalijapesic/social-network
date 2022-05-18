import axios from '../../../lib/axiosSetUp';
import { PostModel } from '../../../models';
import { LikeModel, PageRequest } from '../types';


class PostService{

    async get(request: PageRequest){
        const response = await axios.get(`/posts?_page=${request.page}&_limit=${request.limit}`)
        return response;
    }

    async add(newPost: PostModel){
        const response = await axios.post<PostModel>('/posts', JSON.stringify(newPost));
        return response;
    }

    async like(request: LikeModel){
        const response = await axios.put(`/posts/${request.likedPost.id}`, JSON.stringify(request.likedPost));
        return response;
    }

    async delete(postId: number){
        const response = await axios.delete(`/posts/${postId}`);
        return response;
    }

}

export default new PostService();