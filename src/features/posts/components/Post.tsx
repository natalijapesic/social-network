
import { useState } from "react";
import { PostModel } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthUser } from "../../auth/authenticationSlice";
import CreateComment from "../../comment/components/CreateComment";
import CommentList from "../../comment/components/CommentList";
import { likePost } from "../postSlice";


interface IProps{
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


const Post: React.FC<IProps> = (post: IProps) => {

  const dispatch = useAppDispatch();
  let user = useAppSelector(getAuthUser);
  const [show, setShow] = useState(false);

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
    <div className="flex-column">
      <span>{post.date}</span>
      <img src={post.image} />
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
      {
        user &&
        <CreateComment postId={post.id} />
      }
      <a onClick={() => setShow(!show)}> Show comments </a>
      {
        show && 
        <CommentList postId={post.id} />
      }
    </div>

  );
}

export default Post;