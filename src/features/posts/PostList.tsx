import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "./postSlice";
import Post from './PostComponent'

const PostsList: React.FC = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(selectAllPosts);
    const postStatus = useAppSelector(getPostsStatus);
    const error = useAppSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        content = posts.map((post, index) => <Post key={index} {...post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    
    return (
        <section className="flex-row items-center">
            {content}
        </section>
    )
}
export default PostsList