import { useState } from "react";
import { PostModel } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthUser } from "../../auth/authenticationSlice";
import CreateComment from "../../comment/components/CreateComment";
import { deletePost, likePost } from "../postSlice";
import Button from "../../../components/Button";
import CommentList from "../../comment/components/Comments";


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

  const onDelete = () =>{
    if(window.confirm("Are you sure you want to delete this post?"))
      dispatch(deletePost(post.id));
  }

  return(
    <div className="flex-col  bg-gray-800 my-5">
      {
        user && user.isAdmin &&
        <Button value={post.id} onClick={onDelete} type="button" buttonStyle="redRound" message="X" disabled={false} />
      }
      <div className="flex-col m-5" onClick={() => setShow(!show)}>
        <img src={post.image} />
        <p className="text-2xl text-white font-mono">{post.title}</p>
        <p className="text-sm text-slate-200 font-mono">{post.date}</p>
      </div>
        <div className="flex-col ml-7 content-center">
          <>
          {show ? (
                <>
                  {
                    user &&
                    <Button value={post.id} onClick={onLike} type="button" buttonStyle="dark" message="Like" disabled={false}/>
                  }
                  <p> 
                    <span className="text-lg text-white font mono mr-5">{post.authorName}:</span> 
                    <span className="text-base text-slate-400 font mono">{post.description.substring(0, 100)}</span>
                  </p>
                  {
                    user &&
                    <CreateComment postId={post.id} />
                  }
                  <CommentList postId={post.id}/>
                </>
          ): null}
          </>
        </div>
    </div>
  );
}

export default Post;

