import { PostModel } from "./postModel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { likePost } from "./postSlice";
import { getAuthUser } from "../auth/authenticationSlice";
import { Outlet } from "react-router-dom";
import CommentList from "../comment/CommentList";

interface PostProps{
  id: number;
  title: string;
  image: string;
  description: string;
  authorName: string;
  date: string;
  likes: number;
  usersLikes: number[];
  userId:number;
}


const Post: React.FC<PostProps> = (post: PostProps) => {

  const dispatch = useAppDispatch();
  let user = useAppSelector(getAuthUser);

  const onLike = () => {

    if(user)
    {
      let likedPost = new PostModel(post.title, post.authorName, post.image, post.description, post.userId);
      likedPost.usersLikes = [...post.usersLikes];
      likedPost.likes = post.likes;
      likedPost.userLiked(user.id)
      likedPost.date = post.date;
      likedPost.id = post.id;
      
      dispatch(likePost({likedPost, userId: user.id}));
    } 
  }

  return (
    <div>
      <article 
      className="flex-column border-l-4 m-6">
        <span>{post.date}</span>
        <img src={post.image}/>
        {
          user && 
          <button
            value={post.id}
            onClick={onLike}>
              Like
          </button>
        }
        <div>
          <p><span>{post.authorName}:</span>{post.description.substring(0, 100)}</p>
        </div>
      </article>
      <CommentList />
    </div>

  );
}

export default Post;