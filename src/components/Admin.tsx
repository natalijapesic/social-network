import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../features/posts/postSlice";
import { useAppSelector } from "../stores/hooks";
import AdminPost from "./AdminPost";
import Spinner from "./Spinner";

const headerInfo = ['#', 'Title', 'Image', 'Description', 'Author name', 'Date', 'Likes', 'Delete'];

const Admin: React.FC = () => {
  let posts = useAppSelector(selectAllPosts);
  let postStatus = useAppSelector(getPostsStatus);
  let error = useAppSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = <Spinner type="gray" />
  } else if (postStatus === "succeeded") {
    content = posts.map((post, index) => <AdminPost key={index} {...post} />);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="pt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headerInfo.map((info, index) => <th key={index} className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{info}</th>)}
            </tr>
        </thead>
        <tbody>
            {content}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
