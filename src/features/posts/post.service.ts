import axios from 'axios';
import config from '../app.config.json'
import { PostModel } from './post'


// https://blog.bitsrc.io/setting-up-axios-interceptors-for-all-http-calls-in-an-application-71bc2c636e4e
class PostService{

    async getPosts() {
        return axios.get<PostModel[]>(`${config.server}/posts`);
    };

    async addPost(post: PostModel){

        return axios.post<PostModel>(`${config.server}/posts`, JSON.stringify(post),
            { headers: { 'Content-type': 'application/json' } });
    };

    async deletePost(postId: number){
        return axios.delete(`${config.server}/posts/${postId}`)
    }
}

export default new PostService();