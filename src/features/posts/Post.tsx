import { PostModel } from "./post";

const Post: React.FC<PostModel> = (post: PostModel) => {

  return (
    <article className="flex-column">
      <span>{post.date}</span>
      <div>Image</div>
      <button>Like</button>
      <div>
        <p><span>{post.authorName}:</span>{post.description.substring(0, 100)}</p>
      </div>
    </article>
  );
}

export default Post;