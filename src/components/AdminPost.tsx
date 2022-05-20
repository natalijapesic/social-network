import { deletePost } from "../features/posts/postSlice";
import { useAppDispatch } from "../stores/hooks";
import Button from "./Button";
import { ButtonStyle } from "./types";

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

const AdminPost: React.FC<IProps> = (post: IProps) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?"))
      dispatch(deletePost(post.id));
  };

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      key={post.id}
    >
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.image}</td>
      <td>{post.description}</td>
      <td>{post.authorName}</td>
      <td>{post.date}</td>
      <td>{post.likes}</td>
      <td>
        <Button
          value={post.id}
          onClick={onDelete}
          type="button"
          buttonStyle={ButtonStyle.redRound}
          message="X"
          disabled={false}
        />
      </td>
    </tr>
  );
};

export default AdminPost;
