import { PostModel } from "./post";
import { useAppDispatch } from "../../app/hooks";
import { likePost } from "./postSlice";

const PostComponent: React.FC<PostModel> = (post: PostModel) => {

  const dispatch = useAppDispatch();

  const onLike = () => {
    post.likes = 1;
    dispatch(likePost(post));
  }

  return (
    <article 
    className="flex-column border-l-4 m-6">
      <span>{post.date}</span>
      // eslint-disable-next-line jsx-a11y/alt-text
      <img src={post.image}/>
      <button
        value={post.id}
        onClick={onLike}
      >Like</button>
      <div>
        <p><span>{post.authorName}:</span>{post.description.substring(0, 100)}</p>
      </div>
    </article>
  );
}

export default PostComponent;