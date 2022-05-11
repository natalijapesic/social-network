import { PostModel } from "./post";

const Post: React.FC<PostModel> = (post: PostModel) => {

  return (
    <article 
    className="flex-column border-l-4 m-6">
      <span>{post.date}</span>
      <img src={post.image}/>
      <button value={post.id} >Like</button>
      <div>
        <p><span>{post.authorName}:</span>{post.description.substring(0, 100)}</p>
      </div>
    </article>
  );
}

export default Post;