import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "../postSlice";
import Post from './Post'


const PostsList: React.FC = () => {
    const dispatch = useAppDispatch();

    let posts = useAppSelector(selectAllPosts);
    let postStatus = useAppSelector(getPostsStatus);
    let error = useAppSelector(getPostsError);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        if (postStatus === 'idle' || postStatus === 'succeeded') {
            dispatch(fetchPosts({ page, limit }));
        }
    }, [page, limit, dispatch])


    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        content = posts.map((post, index) => <Post key={index} {...post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    
    return (
        <div className="flex-col content-center">
            <select
                className="flex bg-gray-800 px-5 ml-20 focus:cyan-500"
                name="pageLimit"
                id="pageLimit"
                onChange={(e) => setLimit(parseInt(e.target.value))}>
                
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>

            </select>
            <div className="flex flex-wrap justify-around">
                {content}
            </div>
            <button
                onClick={() => setPage((page) => page + 1)}>
                <a className="flex">Next page</a>
            </button>
        </div>

    );
};
export default PostsList