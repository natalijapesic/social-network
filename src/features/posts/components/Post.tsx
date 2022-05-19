import { useState } from "react";
import { PostModel } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthUser } from "../../auth/authenticationSlice";
import CreateComment from "../../comment/components/CreateComment";
import { likePost } from "../postSlice";
import Button from "../../../components/Button";
import CommentList from "../../comment/components/Comments";
import { ButtonStyle } from "../../../components/types";

interface IProps {
  id: number;
  title: string;
  image: string;
  description: string;
  authorName: string;
  date: string;
  likes: number;
  usersLikes: number[];
  userId: number;
}

const Post: React.FC<IProps> = (post: IProps) => {
  const dispatch = useAppDispatch();
  let user = useAppSelector(getAuthUser);
  const [show, setShow] = useState(false);

  const onLike = () => {
    if (user) {
      let likedPost = new PostModel(
        post.title,
        post.authorName,
        post.image,
        post.description,
        post.userId
      );
      likedPost.usersLikes = [...post.usersLikes];
      likedPost.likes = post.likes;
      likedPost.userLiked(user.id);
      likedPost.date = post.date;
      likedPost.id = post.id;

      dispatch(likePost({ likedPost, userId: user.id }));
    }
  };

  return (
    <div className="flex-col  bg-gray-800 my-5">
      <div className="flex-col m-5" onClick={() => setShow(!show)}>
        <img src={post.image} />
        <p className="text-2xl text-white font-mono">{post.title}</p>
        <p className="text-sm text-slate-200 font-mono">{post.date}</p>
      </div>
      <div className="w-200 flex-col ml-7 content-center">
        <>
          {show ? (
            <>
              {user && (
                <Button
                  value={post.id}
                  onClick={onLike}
                  type="button"
                  buttonStyle={ButtonStyle.dark}
                  message="Like"
                  disabled={false}
                />
              )}
              <p className="w-200 whitespace-normal">
                <span className="text-lg text-white mr-5">
                  {post.authorName}:
                </span>
                <span className="break-words text-base text-slate-400">
                  {post.description.substring(0, 100)}
                </span>
              </p>
              {user && <CreateComment postId={post.id} />}
              <CommentList postId={post.id} />
            </>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default Post;
